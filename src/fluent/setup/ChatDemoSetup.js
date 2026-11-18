var ChatDemoSetup = Class.create()

ChatDemoSetup.prototype = {
    DEMO_USERS: [
        {
            user_name: 'chatdemo.approver',
            first_name: 'Chat',
            last_name: 'Demo Approver',
            email: 'chatdemo.approver@example.com',
            roles: ['approver_user', 'x_kpm95_chatdemo.approver', 'x_kpm95_chatdemo.user'],
        },
        {
            user_name: 'chatdemo.delegate',
            first_name: 'Chat',
            last_name: 'Demo Delegate',
            email: 'chatdemo.delegate@example.com',
            roles: ['approver_user', 'x_kpm95_chatdemo.user'],
        },
        {
            user_name: 'chatdemo.requester',
            first_name: 'Chat',
            last_name: 'Demo Requester',
            email: 'chatdemo.requester@example.com',
            roles: ['x_kpm95_chatdemo.user'],
        },
    ],

    initialize: function () {},

    // Idempotente: puo' essere rieseguito senza creare duplicati.
    // Non imposta password e non assegna itil o admin.
    run: function () {
        var log = []
        var i

        for (i = 0; i < this.DEMO_USERS.length; i++) {
            var spec = this.DEMO_USERS[i]
            var userId = this._ensureUser(spec, log)
            if (userId) {
                this._ensureRoles(userId, spec, log)
            }
        }

        this._setDemoApproverProperty(log)
        return log.join('\n')
    },

    _ensureUser: function (spec, log) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', spec.user_name)
        gr.setLimit(1)
        gr.query()

        if (gr.next()) {
            log.push('utente gia presente: ' + spec.user_name + ' (' + gr.getUniqueValue() + ')')
            return gr.getUniqueValue()
        }

        var ins = new GlideRecord('sys_user')
        ins.initialize()
        ins.setValue('user_name', spec.user_name)
        ins.setValue('first_name', spec.first_name)
        ins.setValue('last_name', spec.last_name)
        ins.setValue('email', spec.email)
        ins.setValue('active', true)
        ins.setValue('locked_out', false)
        ins.setValue('web_service_access_only', false)
        ins.setValue('internal_integration_user', false)
        // Nessuna password impostata: l'accesso avviene per impersonation.
        var sysId = ins.insert()

        if (!sysId) {
            log.push('ERRORE: creazione utente fallita per ' + spec.user_name)
            return null
        }

        log.push('utente creato: ' + spec.user_name + ' (' + sysId + ')')
        return sysId
    },

    _ensureRoles: function (userId, spec, log) {
        for (var i = 0; i < spec.roles.length; i++) {
            var roleName = spec.roles[i]
            var roleId = this._roleIdByName(roleName)

            if (!roleId) {
                log.push('ERRORE: ruolo non trovato: ' + roleName)
                continue
            }

            var has = new GlideRecord('sys_user_has_role')
            has.addQuery('user', userId)
            has.addQuery('role', roleId)
            has.setLimit(1)
            has.query()

            if (has.next()) {
                log.push('ruolo gia assegnato: ' + spec.user_name + ' -> ' + roleName)
                continue
            }

            var ins = new GlideRecord('sys_user_has_role')
            ins.initialize()
            ins.setValue('user', userId)
            ins.setValue('role', roleId)
            var ok = ins.insert()
            log.push(
                ok
                    ? 'ruolo assegnato: ' + spec.user_name + ' -> ' + roleName
                    : 'ERRORE: assegnazione ruolo fallita: ' + spec.user_name + ' -> ' + roleName
            )
        }
    },

    _roleIdByName: function (roleName) {
        var role = new GlideRecord('sys_user_role')
        role.addQuery('name', roleName)
        role.setLimit(1)
        role.query()
        return role.next() ? role.getUniqueValue() : null
    },

    _setDemoApproverProperty: function (log) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', 'chatdemo.approver')
        gr.setLimit(1)
        gr.query()

        if (!gr.next()) {
            log.push('ERRORE: chatdemo.approver non trovato, demo_approver non valorizzata')
            return
        }

        var sysId = gr.getUniqueValue()
        var current = gs.getProperty('x_kpm95_chatdemo.demo_approver', '')

        if (current === sysId) {
            log.push('demo_approver gia valorizzata: ' + sysId)
            return
        }

        gs.setProperty('x_kpm95_chatdemo.demo_approver', sysId)
        log.push('demo_approver impostata a ' + sysId + ' (chatdemo.approver)')
    },

    type: 'ChatDemoSetup',
}
