;(function process(request, response) {
    try {
        var api = new ChatDemoApi()
        var ambito = request.queryParams.ambito ? String(request.queryParams.ambito) : null
        var res = api.approvalsMine(ambito)
        if (res.errore) {
            response.setStatus(400)
            return response.setBody(res)
        }
        response.setStatus(200)
        response.setBody(res)
    } catch (e) {
        response.setStatus(500)
        response.setBody({ codice: 'INTERNAL_ERROR', errore: '' + e })
    }
})(request, response)
