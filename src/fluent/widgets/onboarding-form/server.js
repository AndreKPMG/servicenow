;(function () {
    if (input && input.action === 'submit') {
        var gr = new GlideRecord('x_kpm95_claudecode_onboarding')
        gr.initialize()
        gr.setValue('first_name', input.first_name)
        gr.setValue('last_name', input.last_name)
        gr.setValue('email', input.email)
        gr.setValue('department', input.department)
        gr.setValue('start_date', input.start_date)

        var isValid = input.first_name && input.last_name && input.email
        var sysId = isValid ? gr.insert() : null

        data.success = !!sysId
        data.message = data.success
            ? gs.getMessage('Grazie {0}, la tua richiesta di onboarding è stata inviata.', [input.first_name])
            : gs.getMessage('Compila nome, cognome ed email prima di inviare il form.')
        return
    }
})()
