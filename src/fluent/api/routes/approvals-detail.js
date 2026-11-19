// GET /approvals/detail?approval_sys_id=...
// Dettaglio di una singola approvazione con gli stessi controlli degli altri
// endpoint: la logica sta tutta in ChatDemoApi.skillContext(), che verifica che
// l'utente sia approvatore o delegato attivo, limita la risposta ai campi
// ammessi dell'ambito e calcola gli alert.
// L'id sta nella QUERY STRING, non nel percorso: MCP Server Console non elenca
// gli endpoint con parametri di path.
;(function process(request, response) {
    try {
        var approvalId = request.queryParams ? request.queryParams.approval_sys_id : null
        if (approvalId && approvalId.length) approvalId = approvalId[0]
        if (!approvalId) {
            response.setStatus(400)
            response.setBody({ codice: 'MISSING_APPROVAL_ID', messaggio: 'Indicare approval_sys_id.' })
            return
        }

        var res = new ChatDemoApi().skillContext('' + approvalId)
        if (res.errore === 'NOT_FOUND') {
            response.setStatus(404)
        } else if (res.errore === 'NOT_APPROVER') {
            response.setStatus(403)
        } else {
            response.setStatus(200)
        }
        response.setBody(res)
    } catch (e) {
        response.setStatus(500)
        response.setBody({ codice: 'INTERNAL_ERROR', errore: '' + e })
    }
})(request, response)
