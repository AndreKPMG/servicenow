import { RestApi, ScriptInclude } from '@servicenow/sdk/core'

// Logica condivisa delle API: le route restano sottili.
export const chatDemoApi = ScriptInclude({
    $id: Now.ID['si_chatdemo_api'],
    name: 'ChatDemoApi',
    description: 'Logica dei KPI e delle approvazioni della demo. Solo dati CHATDEMO.',
    script: Now.include('./ChatDemoApi.js'),
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
})

// Base: /api/x_kpm95_chatdemo/chat/v1 (namespace = scope dell'app).
RestApi({
    $id: Now.ID['api_chatdemo_chat'],
    name: 'Chat Demo API',
    serviceId: 'chat',
    active: true,
    shortDescription: 'API della demo: trend ticket, performance SLA, approvazioni e decisione.',
    produces: 'application/json',
    consumes: 'application/json',
    versions: [{ $id: Now.ID['api_v1'], version: 1, active: true, isDefault: true }],
    routes: [
        {
            $id: Now.ID['route_tickets_trend'],
            name: 'Tickets trend',
            method: 'GET',
            path: '/tickets/trend',
            version: 1,
            active: true,
            authentication: true,
            produces: 'application/json',
            shortDescription:
                'Aggregati per mese di ticket aperti e chiusi e backlog attuale, solo dati CHATDEMO. Richiede il ruolo x_kpm95_chatdemo.user.',
            parameters: [
                {
                    $id: Now.ID['p_trend_months'],
                    name: 'months',
                    required: false,
                    exampleValue: '6',
                    shortDescription: 'Numero di mesi da 1 a 12, default 6. Nessuna data futura.',
                },
                {
                    $id: Now.ID['p_trend_groupby'],
                    name: 'group_by',
                    required: false,
                    exampleValue: 'priority',
                    shortDescription: 'priority, state, category oppure assignment_group.',
                },
            ],
            script: Now.include('./routes/tickets-trend.js'),
        },
        {
            $id: Now.ID['route_sla_performance'],
            name: 'SLA performance',
            method: 'GET',
            path: '/sla/performance',
            version: 1,
            active: true,
            authentication: true,
            produces: 'application/json',
            shortDescription:
                'Per mese: totale, breached, percentuale e in corso, solo sulle definizioni SLA CHATDEMO. Richiede il ruolo x_kpm95_chatdemo.user.',
            parameters: [
                {
                    $id: Now.ID['p_sla_months'],
                    name: 'months',
                    required: false,
                    exampleValue: '6',
                    shortDescription: 'Numero di mesi da 1 a 12, default 6.',
                },
                {
                    $id: Now.ID['p_sla_groupby'],
                    name: 'group_by',
                    required: false,
                    exampleValue: 'priority',
                    shortDescription: 'priority, state, category oppure assignment_group.',
                },
            ],
            script: Now.include('./routes/sla-performance.js'),
        },
        {
            $id: Now.ID['route_approvals_mine'],
            name: 'My approvals',
            method: 'GET',
            path: '/approvals/mine',
            version: 1,
            active: true,
            authentication: true,
            produces: 'application/json',
            shortDescription:
                'Approvazioni in attesa dell utente o di chi lo ha delegato, solo sulle due tabelle della demo.',
            parameters: [
                {
                    $id: Now.ID['p_mine_ambito'],
                    name: 'ambito',
                    required: false,
                    exampleValue: 'acquisti',
                    shortDescription: 'Opzionale: acquisti oppure hcx.',
                },
            ],
            script: Now.include('./routes/approvals-mine.js'),
        },
        {
            $id: Now.ID['route_approvals_decision'],
            name: 'Approval decision',
            method: 'POST',
            path: '/approvals/{sys_id}/decision',
            version: 1,
            active: true,
            authentication: true,
            consumes: 'application/json',
            produces: 'application/json',
            shortDescription:
                'Approva o rifiuta. Body: decision approved o rejected, comment obbligatorio sul rifiuto. Stato e commento scritti insieme, poi rilettura.',
            requestExample: '{"decision":"approved","comment":"Verificato budget"}',
            script: Now.include('./routes/approvals-decision.js'),
        },
    ],
})
