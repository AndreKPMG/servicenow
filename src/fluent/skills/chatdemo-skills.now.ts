import { NowAssistSkillConfig, ScriptInclude } from '@servicenow/sdk/core'

// Fase 5 - Le tre skill Now Assist.
//
// ATTENZIONE - LIMITE DELL'SDK 4.14.2: il blocco `tools:` qui sotto **non viene
// emesso**. La build riesce senza alcun errore, ma in keys.ts non compare
// nessuna chiave dei tool e sull'istanza nessun record viene creato. Provato sia
// con `scriptId` come oggetto ScriptInclude sia come sys_id letterale: identico.
// Conseguenza: le skill arrivano al modello SENZA i dati, il segnaposto
// dell'output del tool nel prompt resta vuoto e il modello risponde a vuoto o
// inventa un errore. Verificato leggendo il prompt reale in sys_generative_ai_log.
// Finche' l'SDK non lo supporta, i due tool vanno aggiunti A MANO in
// Now Assist Skill Kit, puntando ai due Script Include qui sotto.
// Il blocco resta nel sorgente come documentazione dell'intento.
// I prompt sono 'published', NON 'draft': con promptState 'draft' la skill si
// attiva regolarmente ma l'esecuzione fallisce subito con
//   "Active prompt configuration not found for given definitionId ..."
// e il connettore vede un 500 "Execution failed". Verificato sull'istanza.
// Il builder non accetta un prompt 'published' su una skill che non lo e',
// quindi anche la skill porta state: 'published'. La guida dell'SDK consiglia
// di pubblicare dalla UI, ma cosi' un install non riporterebbe le skill in
// bozza lasciandole di nuovo senza prompt attivo.
// Ogni skill chiama prima un tool di script che fa i controlli di permesso e i
// calcoli, poi passa al modello solo il JSON risultante. Il modello non legge
// tabelle e non fa conti.
// Nota: i nomi delle skill non possono contenere underscore (vincolo del
// builder), quindi riepilogo_approvazione_acquisti diventa
// 'Riepilogo approvazione acquisti' e cosi' le altre due.

ScriptInclude({
    $id: Now.ID['si_skill_approval_tool'],
    name: 'ChatDemoApprovalTool',
    description:
        'Tool delle skill di riepilogo: verifica approvatore o delegato attivo, legge il record e restituisce campi ammessi e alert.',
    script: Now.include('./ChatDemoApprovalTool.js'),
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
})

ScriptInclude({
    $id: Now.ID['si_skill_ticket_tool'],
    name: 'ChatDemoTicketTool',
    description: 'Tool della skill di analisi ticket: restituisce i soli aggregati CHATDEMO.',
    script: Now.include('./ChatDemoTicketTool.js'),
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
})

// ---------------------------------------------------------------- Acquisti

NowAssistSkillConfig(
    {
        $id: Now.ID['skill_riepilogo_acquisti'],
        name: 'Riepilogo approvazione acquisti',
        shortDescription: 'Riepiloga una richiesta di acquisto da approvare.',
        state: 'published',
        description:
            'Prepara la decisione su una richiesta di acquisto CHATDEMO: importo, budget residuo, preventivo e criticita. I controlli di permesso e i calcoli sono fatti dal tool, non dal modello.',
        inputs: [
            {
                $id: Now.ID['in_acq_approval_id'],
                name: 'approval id',
                description: 'sys_id del record sysapproval_approver da riepilogare.',
                mandatory: true,
                dataType: 'string',
            },
        ],
        tools: (t) => ({
            ContestoAcquisto: t.Script('ContestoAcquisto', {
                $id: Now.ID['tool_acq_contesto'],
                $capabilityId: Now.ID['cap_acq_contesto'],
                scriptId: '6569cd498a9e410a88c4b685f60cb10c',
                scriptFunctionName: 'ChatDemoApprovalTool',
                inputs: [
                    {
                        $id: Now.ID['tool_acq_in_id'],
                        name: 'approvalId',
                        value: t.input['approval id'],
                    },
                ],
                output: { $id: Now.ID['tool_acq_out'] },
            }),
        }),
        securityControls: {
            userAccess: { $id: Now.ID['acl_skill_acquisti'], type: 'authenticated' },
            roleMap: ['x_kpm95_chatdemo.user'],
        },
    },
    {
        providers: [
            {
                provider: 'AWS Claude',
                prompts: [
                    {
                        name: 'Riepilogo acquisto',
                        versions: [
                            {
                                $id: Now.ID['prompt_acq_v1'],
                                version: 1,
                                model: 'claude_large',
                                temperature: 0.1,
                                maxTokens: 1200,
                                promptState: 'published',
                                prompt: (p) => `Sei l'assistente di un responsabile acquisti.
Devi riepilogare una richiesta di acquisto perche' il responsabile possa decidere.

Dati della richiesta, gia' verificati e calcolati dalla piattaforma:
${p.tool.ContestoAcquisto.output}

Regole:
- Usa SOLO i dati sopra. Non inventare numeri, nomi o politiche aziendali.
- Non rifare i calcoli: il campo alert contiene gia' le criticita' rilevate.
  BUDGET_EXCEEDED = importo oltre il budget residuo.
  QUOTE_MISSING = preventivo non allegato.
  HIGH_VALUE = importo oltre 10.000 EUR, serve il secondo livello.
- Se dati_mancanti non e' vuoto, dillo esplicitamente come dato mancante.
- Se il JSON contiene un campo errore, spiega solo che la richiesta non e'
  disponibile per questo utente e fermati: NOT_APPROVER vuol dire che l'utente
  non e' ne' approvatore ne' delegato, NOT_FOUND che la richiesta non esiste.

Rispondi in italiano, massimo 8 righe, in questa forma:
1. Una riga: numero, oggetto, richiedente, importo.
2. Una riga su budget e preventivo.
3. Criticita': una riga per ogni alert, in parole semplici. Se non ce ne sono, scrivi "Nessuna criticita rilevata".
4. Chiusura: cosa consiglieresti di verificare prima di decidere. La decisione resta del responsabile: non dichiarare mai la richiesta approvata o rifiutata.
Input ricevuto: ${p.input['approval id']}`,
                            },
                        ],
                    },
                ],
                defaultPrompt: 'Riepilogo acquisto',
                defaultPromptVersion: 1,
            },
        ],
        defaultProvider: 'AWS Claude',
    }
)

// -------------------------------------------------------------------- HCx

NowAssistSkillConfig(
    {
        $id: Now.ID['skill_riepilogo_hcx'],
        name: 'Riepilogo approvazione HCx',
        shortDescription: 'Riepiloga un engagement HCx da verificare in compliance.',
        state: 'published',
        description:
            'Prepara la verifica compliance su un engagement HCx CHATDEMO: compenso rispetto al fair market value, CV, contratto. I controlli di permesso e i calcoli sono fatti dal tool, non dal modello.',
        inputs: [
            {
                $id: Now.ID['in_hcx_approval_id'],
                name: 'approval id',
                description: 'sys_id del record sysapproval_approver da riepilogare.',
                mandatory: true,
                dataType: 'string',
            },
        ],
        tools: (t) => ({
            ContestoEngagement: t.Script('ContestoEngagement', {
                $id: Now.ID['tool_hcx_contesto'],
                $capabilityId: Now.ID['cap_hcx_contesto'],
                scriptId: '6569cd498a9e410a88c4b685f60cb10c',
                scriptFunctionName: 'ChatDemoApprovalTool',
                inputs: [
                    {
                        $id: Now.ID['tool_hcx_in_id'],
                        name: 'approvalId',
                        value: t.input['approval id'],
                    },
                ],
                output: { $id: Now.ID['tool_hcx_out'] },
            }),
        }),
        securityControls: {
            userAccess: { $id: Now.ID['acl_skill_hcx'], type: 'authenticated' },
            roleMap: ['x_kpm95_chatdemo.user'],
        },
    },
    {
        providers: [
            {
                provider: 'AWS Claude',
                prompts: [
                    {
                        name: 'Riepilogo engagement HCx',
                        versions: [
                            {
                                $id: Now.ID['prompt_hcx_v1'],
                                version: 1,
                                model: 'claude_large',
                                temperature: 0.1,
                                maxTokens: 1200,
                                promptState: 'published',
                                prompt: (p) => `Sei l'assistente di un referente compliance che valuta gli engagement
con operatori sanitari (HCP). Il tono e' prudente: il rischio reputazionale conta
piu' della velocita'.

Dati dell'engagement, gia' verificati e calcolati dalla piattaforma:
${p.tool.ContestoEngagement.output}

Regole:
- Usa SOLO i dati sopra. Non inventare compensi, nomi di medici o riferimenti normativi.
- Non rifare i calcoli: il campo alert contiene gia' le criticita' rilevate.
  FEE_OVER_FMV = compenso proposto sopra il fair market value.
  CV_MISSING = curriculum dell'HCP non ricevuto.
  CONTRACT_MISSING = contratto non firmato.
- Se dati_mancanti non e' vuoto, dillo esplicitamente come dato mancante.
- Se il JSON contiene un campo errore, spiega solo che l'engagement non e'
  disponibile per questo utente e fermati: NOT_APPROVER vuol dire che l'utente
  non e' ne' approvatore ne' delegato, NOT_FOUND che il record non esiste.

Rispondi in italiano, massimo 8 righe, in questa forma:
1. Una riga: numero, HCP, specializzazione, tipo e data dell'evento.
2. Una riga su compenso proposto e fair market value.
3. Rischi di compliance: una riga per ogni alert, in parole semplici. Se non ce ne sono, scrivi "Nessun rischio rilevato".
4. Chiusura: cosa serve prima di dare l'ok. La decisione resta del referente compliance: non dichiarare mai l'engagement approvato o rifiutato.
Input ricevuto: ${p.input['approval id']}`,
                            },
                        ],
                    },
                ],
                defaultPrompt: 'Riepilogo engagement HCx',
                defaultPromptVersion: 1,
            },
        ],
        defaultProvider: 'AWS Claude',
    }
)

// ------------------------------------------------------------------- ITSM

NowAssistSkillConfig(
    {
        $id: Now.ID['skill_analisi_ticket'],
        name: 'Analisi ticket ITSM',
        shortDescription: 'Commenta il trend dei ticket CHATDEMO.',
        state: 'published',
        description:
            'Legge gli aggregati mensili dei ticket CHATDEMO (aperti, chiusi, backlog) e ne commenta l andamento. Gli aggregati sono calcolati dalla piattaforma.',
        inputs: [
            {
                $id: Now.ID['in_itsm_mesi'],
                name: 'mesi',
                description: 'Numero di mesi da analizzare, da 1 a 12. Se vuoto vale 6.',
                mandatory: false,
                dataType: 'string',
                testValues: '6',
            },
        ],
        tools: (t) => ({
            AggregatiTicket: t.Script('AggregatiTicket', {
                $id: Now.ID['tool_itsm_aggregati'],
                $capabilityId: Now.ID['cap_itsm_aggregati'],
                scriptId: '72cd1abe4fd74e83870009b4912cb32f',
                scriptFunctionName: 'ChatDemoTicketTool',
                inputs: [
                    {
                        $id: Now.ID['tool_itsm_in_mesi'],
                        name: 'mesi',
                        value: t.input['mesi'],
                    },
                ],
                output: { $id: Now.ID['tool_itsm_out'] },
            }),
        }),
        securityControls: {
            userAccess: { $id: Now.ID['acl_skill_itsm'], type: 'authenticated' },
            roleMap: ['x_kpm95_chatdemo.user'],
        },
    },
    {
        providers: [
            {
                provider: 'AWS Claude',
                prompts: [
                    {
                        name: 'Analisi trend ticket',
                        versions: [
                            {
                                $id: Now.ID['prompt_itsm_v1'],
                                version: 1,
                                model: 'claude_large',
                                temperature: 0.2,
                                maxTokens: 1200,
                                promptState: 'published',
                                prompt: (p) => `Sei l'assistente di un IT service manager.
Commenti dati che ti vengono forniti gia' aggregati: non hai accesso ai singoli ticket.

Aggregati mensili dei ticket (apertura, chiusura, backlog):
${p.tool.AggregatiTicket.output}

Regole:
- Usa SOLO i numeri sopra. Non stimare, non estrapolare, non citare ticket singoli.
- La finestra si chiude a oggi: il mese corrente e' parziale, dillo quando lo confronti con i mesi pieni.
- Se un mese non c'e' nei dati, non e' zero: e' fuori finestra. Non commentarlo.
- Non dedurre cause tecniche o responsabilita' di persone o gruppi dai soli numeri.

Rispondi in italiano, massimo 8 righe, in questa forma:
1. Una riga: periodo coperto e volumi complessivi aperti e chiusi.
2. Andamento: dove cresce e dove cala, con i numeri.
3. Backlog: valore attuale e se il rapporto aperti su chiusi lo sta facendo crescere.
4. Una riga su cosa guardare, dichiarando che serve un approfondimento sui dati di dettaglio.
Mesi richiesti: ${p.input['mesi']}`,
                            },
                        ],
                    },
                ],
                defaultPrompt: 'Analisi trend ticket',
                defaultPromptVersion: 1,
            },
        ],
        defaultProvider: 'AWS Claude',
    }
)
