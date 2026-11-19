// POST /approvals/decision
// Identica alla route con l'id nel percorso: nessun controllo in meno, la
// logica sta tutta in ChatDemoApi.decide(). L'id dell'approvazione arriva nel
// body perche' MCP Server Console non elenca gli endpoint POST che hanno
// parametri nel percorso.
;(function process(request, response) {
    try {
        var body = request.body ? request.body.data : {}
        var approvalId = body ? body.approval_sys_id || body.sys_id : null
        if (!approvalId) {
            response.setStatus(400)
            response.setBody({ codice: 'MISSING_APPROVAL_ID', messaggio: 'Indicare approval_sys_id nel body.' })
            return
        }
        var res = new ChatDemoApi().decide('' + approvalId, body.decision, body.comment)
        var http = res.http
        delete res.http
        response.setStatus(http)
        response.setBody(res)
    } catch (e) {
        response.setStatus(500)
        response.setBody({ codice: 'INTERNAL_ERROR', errore: '' + e })
    }
})(request, response)
