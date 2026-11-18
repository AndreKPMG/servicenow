var ChatDemoRunner = Class.create()

ChatDemoRunner.prototype = {
    T_ACQ: 'x_kpm95_chatdemo_purchase_req',
    T_HCX: 'x_kpm95_chatdemo_hcp_engage',
    TAG: 'CHATDEMO',
    TAG_TEST: 'CHATDEMO_TEST',
    ROLE_USER: 'x_kpm95_chatdemo.user',

    initialize: function () {},

    // ---------------------------------------------------------------- pilota

    pilot: function () {
        var out = { method: 'pilot', incidents: [], acquisti: [], hcx: [], warnings: [] }
        try {
            var groups = this._groupIds(out)
            var caller = this._userId('chatdemo.requester', out)

            out.gruppo_ripristinato = 0
            var i
            for (i = 0; i < 5; i++) {
                var res = this._createIncident(
                    {
                        short_description: 'CHATDEMO pilota - incident ' + (i + 1),
                        description: 'Record di pilota generato da ChatDemoRunner. Dati inventati.',
                        category: 'software',
                        impact: (i % 3) + 1,
                        urgency: (i % 3) + 1,
                    },
                    groups.length ? groups[i % groups.length] : null,
                    caller,
                    out
                )
                if (res) out.incidents.push(res)
            }

            out.acquisti.push(
                this._createAcq(
                    {
                        short_description: 'CHATDEMO pilota - licenze software',
                        supplier: 'Fornitore Demo Srl',
                        category: 'software',
                        amount: 4800,
                        budget_residual: 20000,
                        cost_center: 'CC-DEMO-01',
                        justification: 'Rinnovo licenze per il team demo.',
                        quote_attached: true,
                    },
                    this.TAG,
                    caller,
                    out
                )
            )

            out.hcx.push(
                this._createHcx(
                    {
                        short_description: 'CHATDEMO pilota - advisory board',
                        hcp_name: 'Dott. Mario Esempio',
                        specialty: 'cardiology',
                        event_type: 'advisory_board',
                        proposed_fee: 1500,
                        fmv_max: 2000,
                        cv_received: true,
                        contract_signed: true,
                        compliance_check: 'not_started',
                    },
                    this.TAG,
                    caller,
                    out
                )
            )

            out.nota = 'I flow girano in background: lanciare pilotReport() dopo qualche secondo.'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    pilotReport: function () {
        var out = { method: 'pilotReport' }
        try {
            out.flow = this.checkFlows()
            out.per_record = this._perRecord()
            out.duplicati = { flow_context: [], approvazioni_primo_livello: [] }
            for (var i = 0; i < out.per_record.length; i++) {
                var r = out.per_record[i]
                if (r.flow_context > 1) out.duplicati.flow_context.push(r.number + ' (' + r.flow_context + ')')
                if (r.approvazioni_l1 > 1)
                    out.duplicati.approvazioni_primo_livello.push(r.number + ' (' + r.approvazioni_l1 + ')')
            }
            out.atteso = 'per ogni record: 1 flow context e 1 approvazione di primo livello'
            out.esito_univocita =
                out.duplicati.flow_context.length === 0 && out.duplicati.approvazioni_primo_livello.length === 0
                    ? 'OK'
                    : 'DOPPIONI'
            out.task_sla = this._taskSla()
            out.sys_email = this._emails()
            out.teams = this._teams()
            out.record = {
                incident: this._count('incident', 'correlation_idSTARTSWITH' + this.TAG),
                acquisti: this._count(this.T_ACQ, ''),
                hcx: this._count(this.T_HCX, ''),
            }
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // Un record per riga: quanti flow context e quante approvazioni ha generato.
    _perRecord: function () {
        var righe = []
        var tabelle = [this.T_ACQ, this.T_HCX]
        for (var t = 0; t < tabelle.length; t++) {
            var gr = new GlideRecord(tabelle[t])
            gr.orderByDesc('sys_created_on')
            gr.setLimit(50)
            gr.query()
            while (gr.next()) {
                var id = gr.getUniqueValue()
                righe.push({
                    number: gr.getValue('number'),
                    tabella: tabelle[t],
                    stato: gr.getDisplayValue('state'),
                    flow_context: this._countContexts(id),
                    approvazioni_l1: this._countApprovals(id, false),
                    approvazioni_l2: this._countApprovals(id, true),
                })
            }
        }
        return righe
    },

    _countContexts: function (recordId) {
        var n = 0
        try {
            var gr = new GlideRecord('sys_flow_context')
            gr.addEncodedQuery('source_record=' + recordId)
            gr.setLimit(20)
            gr.query()
            while (gr.next()) n++
        } catch (e) {
            return -1
        }
        return n
    },

    _countApprovals: function (recordId, secondoLivello) {
        var n = 0
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('sysapproval', recordId)
        gr.setLimit(20)
        gr.query()
        while (gr.next()) {
            var reason = gr.getValue('approval_reason') || ''
            var isL2 = reason.indexOf('Secondo livello') === 0
            if (isL2 === !!secondoLivello) n++
        }
        return n
    },

    // ------------------------------------------------------------------ seed

    // Prepara i dati della demo. Tre blocchi separati e non sovrapposti:
    //   1. 10 approvazioni IN ATTESA per chi conduce la demo (proprieta'
    //      demo_approver). Inserite normalmente: il flow deve partire.
    //   2. record di TEST con tag CHATDEMO_TEST, instradati a chatdemo.approver
    //      e quindi visibili a chatdemo.delegate tramite delega. Fuori dai 10.
    //   3. storico chiuso, scritto con setWorkflow(false): nessun flow, nessuna
    //      approvazione, serve solo ai KPI.
    seed: function () {
        var out = {
            method: 'seed',
            attesa: { acquisti: 0, hcx: 0 },
            test: { acquisti: 0, hcx: 0 },
            storico: { acquisti: 0, hcx: 0 },
            incident: {},
            warnings: [],
        }
        try {
            var caller = this._userId('chatdemo.requester', out)
            var groups = this._groupIds(out)
            var i, res

            // ---------------------------------------- 1) cinque acquisti in attesa
            var acqAttesa = [
                { s: 'Rinnovo licenze CRM', supplier: 'Nordwind Software', category: 'software', amount: 6400, budget_residual: 15000, quote_attached: true, caso: 'regolare' },
                { s: 'Server di collaudo', supplier: 'Baltic Hardware', category: 'hardware', amount: 9200, budget_residual: 4000, quote_attached: true, caso: 'BUDGET_EXCEEDED' },
                { s: 'Consulenza migrazione', supplier: 'Delta Consulting', category: 'consulting', amount: 7800, budget_residual: 20000, quote_attached: false, caso: 'QUOTE_MISSING' },
                { s: 'Rinnovo parco notebook', supplier: 'Baltic Hardware', category: 'hardware', amount: 24000, budget_residual: 60000, quote_attached: true, caso: 'HIGH_VALUE' },
                { s: 'Campagna employer branding', supplier: 'Mediana Comm', category: 'marketing', amount: 5200, budget_residual: 12000, quote_attached: true, caso: 'regolare' },
            ]
            for (i = 0; i < acqAttesa.length; i++) {
                res = this._createAcq(this._acqVals(acqAttesa[i], i), this.TAG, caller, out, false)
                if (res) out.attesa.acquisti++
            }

            // ------------------------------------------- 2) cinque HCx in attesa
            var hcxAttesa = [
                { s: 'Advisory board cardiologia', hcp: 'Dott.ssa Anna Esempio', sp: 'cardiology', ev: 'advisory_board', fee: 1800, fmv: 2500, cv: true, ct: true, caso: 'regolare' },
                { s: 'Speaker congresso oncologia', hcp: 'Dott. Luca Prova', sp: 'oncology', ev: 'speaker', fee: 4200, fmv: 3000, cv: true, ct: true, caso: 'FEE_OVER_FMV' },
                { s: 'Consulenza protocollo', hcp: 'Dott. Marco Finto', sp: 'neurology', ev: 'consultancy', fee: 2200, fmv: 3000, cv: false, ct: true, caso: 'CV_MISSING' },
                { s: 'Partecipazione congresso', hcp: 'Dott.ssa Elisa Test', sp: 'endocrinology', ev: 'congress', fee: 1200, fmv: 2000, cv: true, ct: false, caso: 'CONTRACT_MISSING' },
                { s: 'Advisory board medicina generale', hcp: 'Dott. Paolo Esempio', sp: 'general', ev: 'advisory_board', fee: 1500, fmv: 2200, cv: true, ct: true, caso: 'regolare' },
            ]
            for (i = 0; i < hcxAttesa.length; i++) {
                res = this._createHcx(this._hcxVals(hcxAttesa[i]), this.TAG, caller, out, false)
                if (res) out.attesa.hcx++
            }

            // --------------------- 3) record di test, instradati a chatdemo.approver
            var acqTest = [
                { s: 'TEST permessi acquisto', supplier: 'Nordwind Software', category: 'software', amount: 3300, budget_residual: 9000, quote_attached: true, caso: 'test regolare' },
                { s: 'TEST secondo livello', supplier: 'Delta Consulting', category: 'consulting', amount: 18500, budget_residual: 40000, quote_attached: true, caso: 'test oltre 10.000' },
            ]
            for (i = 0; i < acqTest.length; i++) {
                res = this._createAcq(this._acqVals(acqTest[i], i), this.TAG_TEST, caller, out, false)
                if (res) out.test.acquisti++
            }

            var hcxTest = [
                { s: 'TEST permessi engagement', hcp: 'Dott. Test Uno', sp: 'cardiology', ev: 'advisory_board', fee: 1400, fmv: 2000, cv: true, ct: true, caso: 'test regolare' },
                { s: 'TEST compenso sopra FMV', hcp: 'Dott.ssa Test Due', sp: 'oncology', ev: 'speaker', fee: 3900, fmv: 2600, cv: true, ct: false, caso: 'test con alert' },
            ]
            for (i = 0; i < hcxTest.length; i++) {
                res = this._createHcx(this._hcxVals(hcxTest[i]), this.TAG_TEST, caller, out, false)
                if (res) out.test.hcx++
            }

            // ------------------------------- 4) storico chiuso, senza flow ne approvazioni
            var acqStorico = [
                { s: 'Manutenzione impianti', supplier: 'Facility Pro', category: 'facilities', amount: 3100, budget_residual: 9000, quote_attached: true, caso: 'storico', mesiFa: 3 },
                { s: 'Licenze BI', supplier: 'Nordwind Software', category: 'software', amount: 4300, budget_residual: 11000, quote_attached: true, caso: 'storico', mesiFa: 2 },
                { s: 'Arredi sala riunioni', supplier: 'Facility Pro', category: 'facilities', amount: 2600, budget_residual: 8000, quote_attached: true, caso: 'storico', mesiFa: 1 },
            ]
            for (i = 0; i < acqStorico.length; i++) {
                var va = this._acqVals(acqStorico[i], i)
                va.state = 3
                va.opened_at = this._mesiFa(acqStorico[i].mesiFa)
                res = this._createAcq(va, this.TAG, caller, out, true)
                if (res) out.storico.acquisti++
            }

            var hcxStorico = [
                { s: 'Speaker webinar', hcp: 'Dott.ssa Sara Prova', sp: 'cardiology', ev: 'speaker', fee: 900, fmv: 1500, cv: true, ct: true, caso: 'storico', mesiFa: 3 },
                { s: 'Consulenza linee guida', hcp: 'Dott. Ivan Finto', sp: 'oncology', ev: 'consultancy', fee: 2600, fmv: 3500, cv: true, ct: true, caso: 'storico', mesiFa: 2 },
                { s: 'Advisory board neurologia', hcp: 'Dott.ssa Nora Test', sp: 'neurology', ev: 'advisory_board', fee: 1900, fmv: 2400, cv: true, ct: true, caso: 'storico', mesiFa: 1 },
            ]
            for (i = 0; i < hcxStorico.length; i++) {
                var vh = this._hcxVals(hcxStorico[i])
                vh.state = 3
                vh.compliance_check = 'passed'
                vh.opened_at = this._mesiFa(hcxStorico[i].mesiFa)
                res = this._createHcx(vh, this.TAG, caller, out, true)
                if (res) out.storico.hcx++
            }

            // ------------------------------------------------------- 5) incident
            out.incident = this._seedIncidents(groups, caller, out)

            // Delega per il test 2: chatdemo.approver delega chatdemo.delegate.
            out.delega = this._ensureDelegate(out)

            out.nota =
                'Le 10 approvazioni in attesa nascono dai flow in background: attendere qualche secondo e rilanciare pilotReport(). Lo storico e scritto con setWorkflow(false), quindi non genera approvazioni. Rilanciare seed() duplica i dati: prima reset(true).'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    _acqVals: function (r, i) {
        return {
            short_description: 'CHATDEMO - ' + r.s,
            supplier: r.supplier,
            category: r.category,
            amount: r.amount,
            budget_residual: r.budget_residual,
            cost_center: 'CC-DEMO-0' + ((i % 3) + 1),
            justification: 'Dati inventati per la demo. Caso: ' + r.caso,
            quote_attached: r.quote_attached,
        }
    },

    _hcxVals: function (r) {
        var d = new GlideDateTime()
        d.addDaysLocalTime(30)
        return {
            short_description: 'CHATDEMO - ' + r.s,
            hcp_name: r.hcp,
            specialty: r.sp,
            event_type: r.ev,
            event_date: d.getValue().substring(0, 10),
            proposed_fee: r.fee,
            fmv_max: r.fmv,
            cv_received: r.cv,
            contract_signed: r.ct,
            compliance_check: 'not_started',
        }
    },

    _mesiFa: function (n) {
        var d = new GlideDateTime()
        d.addMonthsLocalTime(-n)
        return d.getValue()
    },

    // ------------------------------------------------------------------ test

    // I test 1-9 della tabella di Fase 6, piu' il test negativo sul requester.
    // Girano in impersonation e chiamano ChatDemoApi, cioe' la stessa logica che
    // sta dietro le quattro API REST: quello che passa qui passa via REST.
    // Il test 10 (reset + seed) e' una sequenza manuale, non automatizzabile qui.
    // Nessun test si ferma senza esito: ogni errore finisce nella riga del test.
    runTests: function () {
        var out = { method: 'runTests', tests: [], warnings: [] }
        try {
            var approverId = this._userId('chatdemo.approver', out)
            var delegateId = this._userId('chatdemo.delegate', out)
            var requesterId = this._userId('chatdemo.requester', out)

            var imp = this._impersonator(out)
            if (!imp) {
                out.tests.push({
                    test: 'impersonation',
                    esito: 'NON DISPONIBILE',
                    nota: 'GlideImpersonate non accessibile: eseguire runTests() da Scripts - Background in scope global.',
                })
                return this._ok(out)
            }
            var original = gs.getUserID()
            var self = this
            var stato = {}

            var come = function (userId, nome, fn) {
                try {
                    imp.impersonate(userId)
                    var r = fn()
                    if (r) out.tests.push(r)
                } catch (e) {
                    out.tests.push({ test: nome, esito: 'ERRORE', errore: '' + e })
                } finally {
                    try {
                        imp.impersonate(original)
                    } catch (e2) {
                        out.warnings.push('ripristino utente: ' + e2)
                    }
                }
            }

            // 1 - l'approvatore vede le proprie approvazioni, solo sulle due tabelle demo
            come(approverId, '1', function () {
                var r = new ChatDemoApi().approvalsMine()
                var soloDemo = true
                for (var i = 0; i < r.approvazioni.length; i++) {
                    var a = r.approvazioni[i].ambito
                    if (a !== 'acquisti' && a !== 'hcx') soloDemo = false
                }
                stato.elenco = r.approvazioni
                return {
                    test: '1 approvals/mine solo tabelle demo',
                    trovate: r.totale,
                    esito: r.totale > 0 && soloDemo ? 'OK' : r.totale === 0 ? 'VUOTO: lanciare prima seed()' : 'KO',
                }
            })

            // 2 - il delegato vede le approvazioni di chi lo ha delegato
            come(delegateId, '2', function () {
                var r = new ChatDemoApi().approvalsMine()
                var perDelega = 0
                for (var i = 0; i < r.approvazioni.length; i++) if (r.approvazioni[i].delegata) perDelega++
                return {
                    test: '2 approvazione delegata',
                    trovate: r.totale,
                    per_delega: perDelega,
                    esito: perDelega > 0 ? 'OK' : 'KO: nessuna approvazione per delega',
                }
            })

            // 3 e 4 - approva, poi riprova la stessa approvazione: 409 NOT_PENDING
            come(approverId, '3 e 4', function () {
                var api = new ChatDemoApi()
                var elenco = api.approvalsMine('acquisti').approvazioni
                if (!elenco.length) {
                    out.tests.push({ test: '4 seconda decisione', esito: 'NON ESEGUITO: manca il test 3' })
                    return { test: '3 approva dal tool', esito: 'VUOTO: nessuna approvazione acquisti in attesa' }
                }
                var id = elenco[0].approval_sys_id
                var primo = api.decide(id, 'approved', 'Approvato dal test automatico.')
                var secondo = api.decide(id, 'approved', 'Secondo tentativo.')
                out.tests.push({
                    test: '4 seconda decisione sulla stessa approvazione',
                    http: secondo.http,
                    codice: secondo.codice,
                    esito: secondo.http === 409 && secondo.codice === 'NOT_PENDING' ? 'OK' : 'KO',
                })
                return {
                    test: '3 approva dal tool',
                    approvazione: elenco[0].numero,
                    http: primo.http,
                    stato: primo.stato_riletto || primo.codice,
                    esito: primo.http === 200 && primo.stato_riletto === 'approved' ? 'OK' : 'KO',
                    nota: 'Il record sorgente lo aggiorna il flow in background: confermare con pilotReport().',
                }
            })

            // 5 - rifiuto senza commento
            come(approverId, '5', function () {
                var api = new ChatDemoApi()
                var elenco = api.approvalsMine().approvazioni
                if (!elenco.length) return { test: '5 rifiuto senza commento', esito: 'VUOTO: nessuna approvazione in attesa' }
                var r = api.decide(elenco[0].approval_sys_id, 'rejected', '')
                return {
                    test: '5 rifiuto senza commento',
                    http: r.http,
                    codice: r.codice,
                    esito: r.http === 400 && r.codice === 'COMMENT_REQUIRED' ? 'OK' : 'KO',
                }
            })

            // 6 - chi non e' approvatore non decide
            come(requesterId, '6', function () {
                var altrui = self._firstApprovalNotOf(requesterId)
                if (!altrui) return { test: '6 utente non approvatore', esito: 'VUOTO: nessuna approvazione di altri' }
                var r = new ChatDemoApi().decide(altrui, 'approved', 'Tentativo non autorizzato.')
                return {
                    test: '6 utente non approvatore',
                    http: r.http,
                    codice: r.codice,
                    esito: r.codice === 'NOT_APPROVER' || r.codice === 'NOT_FOUND' ? 'OK' : 'KO',
                }
            })

            // 7 - KPI confrontati con il conteggio diretto, e solo aggregati
            come(approverId, '7', function () {
                var api = new ChatDemoApi()
                var t = api.ticketsTrend(6, 'priority')
                var sla = api.slaPerformance(6)
                var attesi = self._count('incident', 'correlation_idSTARTSWITH' + self.TAG + '^active=true')
                var soloAggregati = true
                for (var i = 0; i < t.per_mese.length; i++) {
                    if (t.per_mese[i].sys_id || t.per_mese[i].numero) soloAggregati = false
                }
                return {
                    test: '7 KPI contro conteggio diretto',
                    backlog_api: t.backlog.totale,
                    backlog_atteso: attesi,
                    mesi_trend: t.per_mese.length,
                    mesi_sla: sla.per_mese.length,
                    definizioni_sla: sla.definizioni_considerate,
                    esito: t.backlog.totale === attesi && soloAggregati ? 'OK' : 'KO',
                }
            })

            // 8 e 9 - alert attesi presenti, campi fuori perimetro assenti
            come(approverId, '8 e 9', function () {
                var api = new ChatDemoApi()
                var elenco = api.approvalsMine().approvazioni
                if (!elenco.length) {
                    out.tests.push({ test: '9 campi fuori perimetro', esito: 'VUOTO' })
                    return { test: '8 alert obbligatori', esito: 'VUOTO: nessuna approvazione in attesa' }
                }
                var ammessiAcq = {
                    ambito: 1, numero: 1, titolo: 1, richiedente: 1, fornitore: 1, categoria: 1, importo: 1,
                    budget_residuo: 1, centro_di_costo: 1, motivazione: 1, preventivo_allegato: 1,
                    alert: 1, dati_mancanti: 1,
                }
                var ammessiHcx = {
                    ambito: 1, numero: 1, titolo: 1, richiedente: 1, hcp: 1, specializzazione: 1, tipo_evento: 1,
                    data_evento: 1, compenso_proposto: 1, fair_market_value: 1, cv_ricevuto: 1,
                    contratto_firmato: 1, verifica_compliance: 1, alert: 1, dati_mancanti: 1,
                }
                var alertVisti = {}
                var extra = []
                for (var i = 0; i < elenco.length; i++) {
                    var ctx = api.skillContext(elenco[i].approval_sys_id)
                    if (ctx.errore) {
                        out.warnings.push('skillContext ' + elenco[i].numero + ': ' + ctx.errore)
                        continue
                    }
                    var ammessi = ctx.ambito === 'acquisti' ? ammessiAcq : ammessiHcx
                    for (var k in ctx) if (!ammessi[k]) extra.push(ctx.ambito + '.' + k)
                    for (var a = 0; a < ctx.alert.length; a++) alertVisti[ctx.alert[a]] = 1
                }
                var attesi = ['BUDGET_EXCEEDED', 'QUOTE_MISSING', 'HIGH_VALUE', 'FEE_OVER_FMV', 'CV_MISSING', 'CONTRACT_MISSING']
                var mancanti = []
                for (var x = 0; x < attesi.length; x++) if (!alertVisti[attesi[x]]) mancanti.push(attesi[x])
                out.tests.push({
                    test: '9 campi fuori perimetro nella skill',
                    campi_non_ammessi: extra,
                    esito: extra.length === 0 ? 'OK' : 'KO',
                })
                return {
                    test: '8 alert obbligatori',
                    alert_trovati: Object.keys ? Object.keys(alertVisti) : alertVisti,
                    alert_mancanti: mancanti,
                    esito: mancanti.length === 0 ? 'OK' : 'KO: casi non coperti o gia consumati dai test 3 e 5',
                }
            })

            // Ruolo KPI: il requester non ce l'ha, quindi le route rispondono 403
            come(requesterId, 'ruolo KPI', function () {
                var haRuolo = gs.hasRole(self.ROLE_USER)
                return {
                    test: 'ruolo KPI assente sul requester',
                    ruolo_presente: haRuolo,
                    esito: haRuolo ? 'KO: il requester ha il ruolo KPI' : 'OK: le route KPI rispondono 403 ROLE_REQUIRED',
                }
            })

            // Negativo - il requester non legge i record altrui ne aggiorna approvazioni non sue
            come(requesterId, 'negativo requester', function () {
                var visibili = self._countSecure(self.T_ACQ)
                var vietato = 'non testato'
                var altrui = self._firstApprovalNotOf(requesterId)
                if (altrui) {
                    var ga = new GlideRecordSecure('sysapproval_approver')
                    if (ga.get(altrui)) {
                        ga.setValue('state', 'approved')
                        vietato = ga.update() ? 'KO: update riuscito' : 'OK: update rifiutato'
                    } else {
                        vietato = 'OK: record non leggibile'
                    }
                }
                return {
                    test: 'negativo requester',
                    record_acquisto_visibili: visibili,
                    update_approvazione_altrui: vietato,
                    esito: visibili === 0 && vietato.indexOf('OK') === 0 ? 'OK' : 'DA VERIFICARE',
                }
            })

            out.nota =
                'I test 3 e 5 consumano due approvazioni in attesa: dopo runTests() ne restano 8 e il test 8 puo segnalare alert mancanti. Prima della demo: reset(true) e poi seed() (test 10).'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ----------------------------------------------------------------- reset

    reset: function (confirm) {
        var out = { method: 'reset', confirm: confirm === true }
        try {
            var conteggi = {
                acquisti: this._count(this.T_ACQ, ''),
                hcx: this._count(this.T_HCX, ''),
                incident: this._count('incident', 'correlation_idSTARTSWITH' + this.TAG),
                approvazioni: this._count('sysapproval_approver', 'source_tableIN' + this.T_ACQ + ',' + this.T_HCX),
                task_sla: this._count('task_sla', 'task.correlation_idSTARTSWITH' + this.TAG),
                delega: this._count('sys_user_delegate', 'user.user_nameSTARTSWITHchatdemo'),
                sys_email: this._demoRecordIds().length ? this._countEmails() : 0,
            }
            out.conteggi = conteggi

            if (confirm !== true) {
                out.nota = 'Nessuna cancellazione. Rilanciare con reset(true) per eliminare questi record.'
                return this._ok(out)
            }

            // Le email vanno rimosse prima dei record: il collegamento e'
            // sys_email.instance, che dopo la cancellazione non sarebbe piu' risolvibile.
            var emailRimosse = this._purgeEmails()

            out.cancellati = {
                sys_email: emailRimosse,
                task_sla: this._purge('task_sla', 'task.correlation_idSTARTSWITH' + this.TAG),
                approvazioni: this._purge('sysapproval_approver', 'source_tableIN' + this.T_ACQ + ',' + this.T_HCX),
                acquisti: this._purge(this.T_ACQ, ''),
                hcx: this._purge(this.T_HCX, ''),
                incident: this._purge('incident', 'correlation_idSTARTSWITH' + this.TAG),
                delega: this._purge('sys_user_delegate', 'user.user_nameSTARTSWITHchatdemo'),
            }
            out.nota = 'Utenti, gruppi, ruoli, ACL e flow non vengono toccati.'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ------------------------------------------------------------- interni

    // sys_id di tutti i record CHATDEMO, usati per agganciare le email.
    _demoRecordIds: function () {
        var ids = []
        var fonti = [
            { t: 'incident', q: 'correlation_idSTARTSWITH' + this.TAG },
            { t: this.T_ACQ, q: '' },
            { t: this.T_HCX, q: '' },
        ]
        for (var i = 0; i < fonti.length; i++) {
            var gr = new GlideRecord(fonti[i].t)
            if (fonti[i].q) gr.addEncodedQuery(fonti[i].q)
            gr.setLimit(5000)
            gr.query()
            while (gr.next()) ids.push(gr.getUniqueValue())
        }
        return ids
    },

    _countEmails: function () {
        var ids = this._demoRecordIds()
        var n = 0
        for (var i = 0; i < ids.length; i += 100) {
            var gr = new GlideRecord('sys_email')
            gr.addEncodedQuery('instanceIN' + ids.slice(i, i + 100).join(','))
            gr.setLimit(1000)
            gr.query()
            while (gr.next()) n++
        }
        return n
    },

    _purgeEmails: function () {
        try {
            var ids = this._demoRecordIds()
            var n = 0
            for (var i = 0; i < ids.length; i += 100) {
                var gr = new GlideRecord('sys_email')
                gr.addEncodedQuery('instanceIN' + ids.slice(i, i + 100).join(','))
                gr.setLimit(1000)
                gr.query()
                while (gr.next()) {
                    gr.setWorkflow(false)
                    if (gr.deleteRecord()) n++
                }
            }
            return n
        } catch (e) {
            return 'errore: ' + e
        }
    },

    // Imposta assignment_group gia' all'insert. Se una regola preesistente lo
    // cambia, lo riscrive con setWorkflow(false) e solo sui record CHATDEMO:
    // la regola non viene toccata.
    // silenzioso = true: setWorkflow(false). Nessuna business rule, quindi
    // nessun task_sla reale e nessuno spostamento di gruppo: si usa solo per lo
    // storico chiuso.
    _createIncident: function (vals, groupId, caller, out, silenzioso) {
        try {
            var gr = new GlideRecord('incident')
            gr.initialize()
            for (var k in vals) gr.setValue(k, vals[k])
            gr.setValue('correlation_id', this.TAG)
            if (groupId) gr.setValue('assignment_group', groupId)
            if (caller) gr.setValue('caller_id', caller)
            if (silenzioso === true) gr.setWorkflow(false)
            var id = gr.insert()
            if (!id) {
                out.warnings.push('insert incident fallito: ' + vals.short_description)
                return null
            }

            var number = gr.getValue('number')
            if (groupId && silenzioso !== true) {
                var check = new GlideRecord('incident')
                if (check.get(id)) {
                    var attuale = check.getValue('assignment_group')
                    var tag = check.getValue('correlation_id') || ''
                    if (attuale !== groupId && tag.indexOf(this.TAG) === 0) {
                        check.setValue('assignment_group', groupId)
                        check.setWorkflow(false)
                        if (check.update()) {
                            out.gruppo_ripristinato = (out.gruppo_ripristinato || 0) + 1
                        } else {
                            out.warnings.push('ripristino gruppo fallito su ' + number)
                        }
                    }
                }
            }
            return { sys_id: id, number: number }
        } catch (e) {
            out.warnings.push('errore incident: ' + e)
            return null
        }
    },

    // Verifica che i flow siano attivi, pubblicati e agganciati ai trigger.
    checkFlows: function () {
        var res = []
        var gr = new GlideRecord('sys_hub_flow')
        gr.addEncodedQuery('nameSTARTSWITHCHATDEMO')
        gr.setLimit(10)
        gr.query()
        while (gr.next()) {
            var flowId = gr.getUniqueValue()
            var triggers = []
            var tr = new GlideRecord('sys_hub_trigger_instance_v2')
            tr.addQuery('flow', flowId)
            tr.setLimit(20)
            tr.query()
            while (tr.next()) {
                triggers.push({
                    sys_id: tr.getUniqueValue(),
                    tipo: tr.getValue('trigger_type'),
                    published_version: tr.getValue('published_version') || '(vuoto)',
                })
            }
            res.push({
                flow: gr.getValue('name'),
                active: gr.getValue('active'),
                status: gr.getValue('status'),
                trigger: triggers.length,
                dettaglio: triggers,
                agganciato: triggers.length === 1 && triggers[0].published_version !== '(vuoto)',
            })
        }
        return res
    },

    // silenzioso = true: setWorkflow(false), quindi nessun flow e nessuna
    // approvazione. Si usa solo per lo storico che alimenta i KPI.
    _createAcq: function (vals, tag, caller, out, silenzioso) {
        try {
            var gr = new GlideRecord(this.T_ACQ)
            gr.initialize()
            gr.setValue('state', 1)
            for (var k in vals) gr.setValue(k, vals[k])
            gr.setValue('correlation_id', tag)
            if (caller) gr.setValue('opened_by', caller)
            if (silenzioso === true) gr.setWorkflow(false)
            var id = gr.insert()
            if (!id) {
                out.warnings.push('insert acquisto fallito: ' + vals.short_description)
                return null
            }
            return { sys_id: id, number: gr.getValue('number') }
        } catch (e) {
            out.warnings.push('errore acquisto: ' + e)
            return null
        }
    },

    _createHcx: function (vals, tag, caller, out, silenzioso) {
        try {
            var gr = new GlideRecord(this.T_HCX)
            gr.initialize()
            gr.setValue('state', 1)
            for (var k in vals) gr.setValue(k, vals[k])
            gr.setValue('correlation_id', tag)
            if (caller) gr.setValue('opened_by', caller)
            if (silenzioso === true) gr.setWorkflow(false)
            var id = gr.insert()
            if (!id) {
                out.warnings.push('insert hcx fallito: ' + vals.short_description)
                return null
            }
            return { sys_id: id, number: gr.getValue('number') }
        } catch (e) {
            out.warnings.push('errore hcx: ' + e)
            return null
        }
    },

    // 18 incident APERTI inseriti normalmente: li prende il motore SLA reale,
    // che crea i task_sla sulle definizioni CHATDEMO.
    // Lo storico dei mesi precedenti e' scritto con setWorkflow(false) e per
    // ogni incident storico si inserisce un task_sla sintetico, anch'esso con
    // setWorkflow(false): senza quello i KPI SLA avrebbero solo il mese in corso.
    _seedIncidents: function (groups, caller, out) {
        var res = { aperti: 0, storici: 0, sla_sintetici: 0, definizioni_sla: 0 }
        var i, p, r

        // --- aperti (motore reale)
        for (i = 0; i < 18; i++) {
            var apertura = new GlideDateTime()
            apertura.addDaysLocalTime(-(i % 12))
            r = this._createIncident(
                {
                    short_description: 'CHATDEMO - segnalazione aperta ' + (i + 1),
                    category: ['software', 'hardware', 'network', 'inquiry'][i % 4],
                    impact: (i % 3) + 1,
                    urgency: (i % 3) + 1,
                    state: i % 4 === 0 ? 1 : 2,
                    opened_at: apertura.getValue(),
                },
                groups.length ? groups[i % groups.length] : null,
                caller,
                out,
                false
            )
            if (r) res.aperti++
        }

        // --- storico chiuso: picco due mesi fa, calo, risalita
        var defs = this._slaDefs(out)
        res.definizioni_sla = defs.length
        var piano = [
            { mesiFa: 5, n: 18, sforati: 3 },
            { mesiFa: 4, n: 21, sforati: 4 },
            { mesiFa: 3, n: 26, sforati: 7 },
            { mesiFa: 2, n: 38, sforati: 14 },
            { mesiFa: 1, n: 20, sforati: 3 },
        ]
        for (p = 0; p < piano.length; p++) {
            for (i = 0; i < piano[p].n; i++) {
                var ap = new GlideDateTime()
                ap.addMonthsLocalTime(-piano[p].mesiFa)
                ap.addDaysLocalTime(-(i % 20))
                var ch = new GlideDateTime(ap.getValue())
                ch.addDaysLocalTime(1 + (i % 4))

                r = this._createIncident(
                    {
                        short_description: 'CHATDEMO - segnalazione chiusa ' + piano[p].mesiFa + '-' + (i + 1),
                        category: ['software', 'hardware', 'network', 'inquiry'][i % 4],
                        impact: (i % 3) + 1,
                        urgency: (i % 3) + 1,
                        state: 7,
                        active: false,
                        opened_at: ap.getValue(),
                        resolved_at: ch.getValue(),
                        closed_at: ch.getValue(),
                        close_code: 'Solved (Permanently)',
                        close_notes: 'CHATDEMO: storico sintetico per i KPI.',
                    },
                    groups.length ? groups[i % groups.length] : null,
                    caller,
                    out,
                    true
                )
                if (!r) continue
                res.storici++
                res.sla_sintetici += this._seedTaskSla(r.sys_id, defs, ap, ch, i < piano[p].sforati, out)
            }
        }

        return res
    },

    // Definizioni SLA della demo, cercate per nome: non dipende dai sys_id.
    _slaDefs: function (out) {
        var defs = []
        try {
            var gr = new GlideRecord('contract_sla')
            gr.addEncodedQuery('nameSTARTSWITH' + this.TAG)
            gr.setLimit(10)
            gr.query()
            while (gr.next()) defs.push({ sys_id: gr.getUniqueValue(), name: gr.getValue('name') })
            if (!defs.length) out.warnings.push('nessuna definizione SLA CHATDEMO trovata: lo storico SLA resta vuoto')
        } catch (e) {
            out.warnings.push('lettura contract_sla: ' + e)
        }
        return defs
    },

    _seedTaskSla: function (taskId, defs, inizio, fine, sforato, out) {
        var creati = 0
        for (var d = 0; d < defs.length; d++) {
            try {
                var gr = new GlideRecord('task_sla')
                gr.initialize()
                gr.setValue('task', taskId)
                gr.setValue('sla', defs[d].sys_id)
                gr.setValue('stage', 'completed')
                gr.setValue('active', false)
                gr.setValue('has_breached', sforato)
                gr.setValue('start_time', inizio.getValue())
                gr.setValue('end_time', fine.getValue())
                gr.setValue('percentage', sforato ? 130 : 70)
                gr.setWorkflow(false)
                if (gr.insert()) creati++
            } catch (e) {
                out.warnings.push('task_sla sintetico: ' + e)
                return creati
            }
        }
        return creati
    },

    _ensureDelegate: function (out) {
        try {
            var approver = this._userId('chatdemo.approver', out)
            var delegate = this._userId('chatdemo.delegate', out)
            if (!approver || !delegate) return 'utenti mancanti'

            var gr = new GlideRecord('sys_user_delegate')
            gr.addQuery('user', approver)
            gr.addQuery('delegate', delegate)
            gr.setLimit(1)
            gr.query()
            if (gr.next()) return 'gia presente'

            var ins = new GlideRecord('sys_user_delegate')
            ins.initialize()
            ins.setValue('user', approver)
            ins.setValue('delegate', delegate)
            ins.setValue('approvals', true)
            var da = new GlideDateTime()
            da.addDaysLocalTime(-1)
            var a = new GlideDateTime()
            a.addDaysLocalTime(90)
            ins.setValue('starts', da.getValue())
            ins.setValue('ends', a.getValue())
            return ins.insert() ? 'creata' : 'insert rifiutato'
        } catch (e) {
            out.warnings.push('delega: ' + e)
            return 'errore'
        }
    },

    _myApprovals: function (soloDemo) {
        var res = []
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('approver', gs.getUserID())
        gr.addQuery('state', 'requested')
        if (soloDemo) gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.setLimit(100)
        gr.query()
        while (gr.next()) {
            res.push({ sys_id: gr.getUniqueValue(), table: gr.getValue('source_table') })
        }
        return res
    },

    _firstApprovalNotOf: function (userId) {
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.addQuery('approver', '!=', userId)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : null
    },

    _countSecure: function (table) {
        var n = 0
        var gr = new GlideRecordSecure(table)
        gr.setLimit(100)
        gr.query()
        while (gr.next()) n++
        return n
    },

    _flowContexts: function () {
        var res = []
        var gr = new GlideRecord('sys_flow_context')
        gr.addEncodedQuery('nameLIKECHATDEMO')
        gr.orderByDesc('sys_created_on')
        gr.setLimit(20)
        gr.query()
        while (gr.next()) {
            res.push({ name: gr.getValue('name'), stato: gr.getDisplayValue('state'), creato: gr.getValue('sys_created_on') })
        }
        return res
    },

    _approvals: function () {
        var res = []
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.orderByDesc('sys_created_on')
        gr.setLimit(30)
        gr.query()
        while (gr.next()) {
            res.push({
                sys_id: gr.getUniqueValue(),
                table: gr.getValue('source_table'),
                approver: gr.getDisplayValue('approver'),
                state: gr.getValue('state'),
            })
        }
        return res
    },

    _taskSla: function () {
        var res = { totale: 0, per_definizione: {} }
        var gr = new GlideRecord('task_sla')
        gr.addEncodedQuery('task.correlation_idSTARTSWITH' + this.TAG)
        gr.setLimit(500)
        gr.query()
        while (gr.next()) {
            res.totale++
            var d = gr.getDisplayValue('sla') || 'n/d'
            res.per_definizione[d] = (res.per_definizione[d] || 0) + 1
        }
        return res
    },

    _emails: function () {
        var res = { totale_ultima_ora: 0, per_tipo: {}, esempi: [] }
        var da = new GlideDateTime()
        da.addSeconds(-3600)
        var gr = new GlideRecord('sys_email')
        gr.addQuery('sys_created_on', '>=', da)
        gr.orderByDesc('sys_created_on')
        gr.setLimit(200)
        gr.query()
        while (gr.next()) {
            res.totale_ultima_ora++
            var t = gr.getValue('type') || 'n/d'
            res.per_tipo[t] = (res.per_tipo[t] || 0) + 1
            if (res.esempi.length < 5) {
                res.esempi.push({ subject: (gr.getValue('subject') || '').substring(0, 70), to: gr.getValue('recipients') })
            }
        }
        return res
    },

    _teams: function () {
        try {
            var da = new GlideDateTime()
            da.addSeconds(-3600)
            var gr = new GlideRecord('sn_now_teams_outbound_message')
            gr.addQuery('sys_created_on', '>=', da)
            gr.setLimit(50)
            gr.query()
            var n = 0
            while (gr.next()) n++
            return { tabella: 'sn_now_teams_outbound_message', messaggi_ultima_ora: n }
        } catch (e) {
            return { tabella: 'sn_now_teams_outbound_message', errore: '' + e }
        }
    },

    _groupIds: function (out) {
        var ids = []
        var gr = new GlideRecord('sys_user_group')
        gr.addEncodedQuery('nameSTARTSWITHCHATDEMO')
        gr.setLimit(10)
        gr.query()
        while (gr.next()) ids.push(gr.getUniqueValue())
        if (!ids.length && out && out.warnings) out.warnings.push('nessun gruppo CHATDEMO trovato')
        return ids
    },

    _userId: function (userName, out) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', userName)
        gr.setLimit(1)
        gr.query()
        if (gr.next()) return gr.getUniqueValue()
        if (out && out.warnings) out.warnings.push('utente non trovato: ' + userName)
        return null
    },

    _impersonator: function (out) {
        try {
            return new GlideImpersonate()
        } catch (e) {
            if (out && out.warnings) out.warnings.push('GlideImpersonate non disponibile: ' + e)
            return null
        }
    },

    _every: function (list, t1, t2) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].table !== t1 && list[i].table !== t2) return false
        }
        return true
    },

    _count: function (table, encoded) {
        try {
            var ga = new GlideAggregate(table)
            if (encoded) ga.addEncodedQuery(encoded)
            ga.addAggregate('COUNT')
            ga.query()
            return ga.next() ? parseInt(ga.getAggregate('COUNT'), 10) : 0
        } catch (e) {
            return -1
        }
    },

    _purge: function (table, encoded) {
        try {
            var gr = new GlideRecord(table)
            if (encoded) gr.addEncodedQuery(encoded)
            gr.setLimit(5000)
            gr.query()
            var n = 0
            while (gr.next()) {
                gr.setWorkflow(false)
                if (gr.deleteRecord()) n++
            }
            return n
        } catch (e) {
            return 'errore: ' + e
        }
    },

    _ok: function (out) {
        out.ok = true
        var s = JSON.stringify(out)
        gs.info('[CHATDEMO] ' + s)
        return s
    },

    _err: function (out, e) {
        out.ok = false
        out.errore = '' + e
        var s = JSON.stringify(out)
        gs.error('[CHATDEMO] ' + s)
        return s
    },

    type: 'ChatDemoRunner',
}
