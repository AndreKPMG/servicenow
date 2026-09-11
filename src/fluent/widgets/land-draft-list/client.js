api.controller = function () {
    var c = this

    c.refreshing = false

    c.refresh = function () {
        c.refreshing = true
        c.server.refresh().then(function () {
            c.refreshing = false
        })
    }
}
