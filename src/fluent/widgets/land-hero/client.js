api.controller = function () {
    var c = this

    c.scrollToForm = function () {
        var target = document.getElementById('rn-draft-form')
        if (target && target.scrollIntoView) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}
