;(function process(request, response) {
    try {
        if (!gs.hasRole('x_kpm95_chatdemo.user')) {
            response.setStatus(403)
            return response.setBody({ codice: 'ROLE_REQUIRED', ruolo: 'x_kpm95_chatdemo.user' })
        }
        var api = new ChatDemoApi()
        response.setStatus(200)
        response.setBody(api.slaPerformance(request.queryParams.months, request.queryParams.group_by))
    } catch (e) {
        response.setStatus(500)
        response.setBody({ codice: 'INTERNAL_ERROR', errore: '' + e })
    }
})(request, response)
