api.controller = function () {
    var c = this

    c.scrollTo = function (elementId) {
        var target = document.getElementById(elementId)
        if (target && target.scrollIntoView) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}
