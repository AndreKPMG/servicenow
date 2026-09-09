api.controller = function () {
    var c = this
    c.formData = {
        first_name: '',
        last_name: '',
        email: '',
        department: '',
        start_date: '',
    }
    c.submitted = false
    c.message = ''

    c.submit = function () {
        c.data.action = 'submit'
        c.data.first_name = c.formData.first_name
        c.data.last_name = c.formData.last_name
        c.data.email = c.formData.email
        c.data.department = c.formData.department
        c.data.start_date = c.formData.start_date

        c.server.update().then(function (response) {
            c.submitted = response.data.success
            c.message = response.data.message
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
