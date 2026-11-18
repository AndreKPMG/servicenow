;(function process(request, response) {
    try {
        var api = new ChatDemoApi()
        var body = request.body ? request.body.data : {}
        var res = api.decide(
            request.pathParams.sys_id,
            body ? body.decision : null,
            body ? body.comment : null
        )
        var http = res.http
        delete res.http
        response.setStatus(http)
        response.setBody(res)
    } catch (e) {
        response.setStatus(500)
        response.setBody({ codice: 'INTERNAL_ERROR', errore: '' + e })
    }
})(request, response)
