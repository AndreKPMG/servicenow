;(function () {
    var TABLE = 'x_kpm95_claudecode_land_draft'

    data.energyTypes = getChoices('energy_type')
    data.submitResult = null

    if (input && (input.action === 'save_draft' || input.action === 'submit_review')) {
        data.submitResult = saveDraft(input.form, input.action === 'submit_review' ? 'submitted' : 'draft')
        return
    }

    function getChoices(element) {
        var choices = []
        var gr = new GlideRecord('sys_choice')
        gr.addQuery('name', TABLE)
        gr.addQuery('element', element)
        gr.addQuery('inactive', false)
        gr.orderBy('sequence')
        gr.orderBy('label')
        gr.setLimit(50)
        gr.query()
        while (gr.next()) {
            choices.push({ value: gr.getValue('value'), label: gr.getValue('label') })
        }
        return choices
    }

    function saveDraft(form, state) {
        form = form || {}
        var errors = []

        if (!text(form.project_name)) {
            errors.push('Project name is required.')
        }
        if (!text(form.energy_type)) {
            errors.push('Energy type is required.')
        }
        if (!text(form.municipality)) {
            errors.push('Municipality is required.')
        }
        if (text(form.landowner_email) && text(form.landowner_email).indexOf('@') < 0) {
            errors.push('Landowner email is not a valid address.')
        }

        ;['area_hectares', 'estimated_capacity_mw', 'grid_distance_km', 'estimated_budget'].forEach(function (field) {
            if (text(form[field]) && isNaN(parseFloat(form[field]))) {
                errors.push('"' + field.replace(/_/g, ' ') + '" must be a number.')
            }
        })

        if (state === 'submitted') {
            if (!text(form.area_hectares)) {
                errors.push('Area (ha) is required to submit a draft for review.')
            }
            if (!text(form.landowner_name)) {
                errors.push('Landowner is required to submit a draft for review.')
            }
        }

        if (errors.length > 0) {
            return { success: false, errors: errors }
        }

        var gr = new GlideRecord(TABLE)
        gr.initialize()
        gr.setValue('project_name', text(form.project_name))
        gr.setValue('energy_type', text(form.energy_type))
        gr.setValue('municipality', text(form.municipality))
        gr.setValue('region', text(form.region))
        gr.setValue('country', text(form.country))
        gr.setValue('cadastral_reference', text(form.cadastral_reference))
        gr.setValue('area_hectares', text(form.area_hectares))
        gr.setValue('estimated_capacity_mw', text(form.estimated_capacity_mw))
        gr.setValue('grid_distance_km', text(form.grid_distance_km))
        gr.setValue('landowner_name', text(form.landowner_name))
        gr.setValue('landowner_email', text(form.landowner_email))
        gr.setValue('target_acquisition_date', text(form.target_acquisition_date))
        gr.setValue('estimated_budget', text(form.estimated_budget))
        gr.setValue('notes', text(form.notes))
        gr.setValue('state', state)
        gr.setValue('submitted_by', gs.getUserID())

        var sysId = gr.insert()
        if (!sysId) {
            return {
                success: false,
                errors: [gs.getMessage('The draft could not be saved. Please contact the development team.')],
            }
        }

        return {
            success: true,
            state: state,
            projectName: text(form.project_name),
            message:
                state === 'submitted'
                    ? gs.getMessage('Your project draft has been submitted for review.')
                    : gs.getMessage('Your project draft has been saved.'),
        }
    }

    function text(value) {
        return value === null || value === undefined ? '' : ('' + value).trim()
    }
})()
