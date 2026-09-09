api.controller = function () {
    var c = this
    c.formData = {
        first_name: '',
        last_name: '',
        email: '',
        department: '',
        start_date: '',
    }
    c.submitting = false
    c.submitted = false
    c.message = ''

    c.submit = function () {
        c.submitting = true
        c.message = ''

        // c.server.update() sends the current c.data object as input to the
        // server. The resolved promise merges the server response into
        // c.data -- read the result from c.data, not from the .then() arg.
        c.data.action = 'submit'
        c.data.first_name = c.formData.first_name
        c.data.last_name = c.formData.last_name
        c.data.email = c.formData.email
        c.data.department = c.formData.department
        c.data.start_date = c.formData.start_date

        c.server.update().then(function () {
            c.submitting = false
            c.data.action = null
            c.submitted = !!c.data.success
            c.message = c.data.message

            if (c.submitted) {
                c.formData = {
                    first_name: '',
                    last_name: '',
                    email: '',
                    department: '',
                    start_date: '',
                }
            }
        })
    }

    c.resetForm = function () {
        c.submitted = false
        c.message = ''
    }
}
