api.controller = function () {
    var c = this

    c.view = 'form'
    c.submitting = false
    c.errors = []
    c.result = null
    c.form = emptyForm()

    c.saveDraft = function () {
        send('save_draft')
    }

    c.submitForReview = function () {
        send('submit_review')
    }

    c.startAnother = function () {
        c.form = emptyForm()
        c.errors = []
        c.result = null
        c.view = 'form'
    }

    function send(action) {
        c.errors = []
        c.submitting = true

        // c.server.update() posts the current c.data as `input`; the response is
        // merged back into c.data, so the result is read from c.data afterwards.
        c.data.action = action
        c.data.form = c.form

        c.server.update().then(function () {
            c.submitting = false
            c.data.action = null

            var result = c.data.submitResult
            if (result && result.success) {
                c.result = result
                c.view = 'success'
            } else if (result && result.errors) {
                c.errors = result.errors
            }
        })
    }

    function emptyForm() {
        return {
            project_name: '',
            energy_type: '',
            municipality: '',
            region: '',
            country: '',
            cadastral_reference: '',
            area_hectares: '',
            estimated_capacity_mw: '',
            grid_distance_km: '',
            landowner_name: '',
            landowner_email: '',
            target_acquisition_date: '',
            estimated_budget: '',
            notes: '',
        }
    }
}
