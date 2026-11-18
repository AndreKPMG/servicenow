var ChatDemoRunner = Class.create()

ChatDemoRunner.prototype = {
    T_ACQ: 'x_kpm95_chatdemo_purchase_req',
    T_HCX: 'x_kpm95_chatdemo_hcp_engage',
    TAG: 'CHATDEMO',
    TAG_TEST: 'CHATDEMO_TEST',

    initialize: function () {},

    // ---------------------------------------------------------------- pilota

    pilot: function () {
        var out = { method: 'pilot', incidents: [], acquisti: [], hcx: [], warnings: [] }
        try {
            var groups = this._groupIds(out)
            var caller = this._userId('chatdemo.requester', out)

            var i
            for (i = 0; i < 5; i++) {
                var inc = new GlideRecord('incident')
                inc.initialize()
                inc.setValue('short_description', 'CHATDEMO pilota - incident ' + (i + 1))
                inc.setValue('description', 'Record di pilota generato da ChatDemoRunner. Dati inventati.')
                inc.setValue('correlation_id', this.TAG)
                inc.setValue('category', 'software')
                inc.setValue('impact', (i % 3) + 1)
                inc.setValue('urgency', (i % 3) + 1)
                if (groups.length) inc.setValue('assignment_group', groups[i % groups.length])
                if (caller) inc.setValue('caller_id', caller)
                var incId = inc.insert()
                if (incId) {
                    out.incidents.push({ sys_id: incId, number: inc.getValue('number') })
                } else {
                    out.warnings.push('insert incident ' + (i + 1) + ' fallito')
                }
            }

            out.acquisti.push(
                this._createAcq(
                    {
                        short_description: 'CHATDEMO pilota - licenze software',
                        supplier: 'Fornitore Demo Srl',
                        category: 'software',
                        amount: 4800,
                        budget_residual: 20000,
                        cost_center: 'CC-DEMO-01',
                        justification: 'Rinnovo licenze per il team demo.',
                        quote_attached: true,
                    },
                    this.TAG,
                    caller,
                    out
                )
            )

            out.hcx.push(
                this._createHcx(
                    {
                        short_description: 'CHATDEMO pilota - advisory board',
                        hcp_name: 'Dott. Mario Esempio',
                        specialty: 'cardiology',
                        event_type: 'advisory_board',
                        proposed_fee: 1500,
                        fmv_max: 2000,
                        cv_received: true,
                        contract_signed: true,
                        compliance_check: 'not_started',
                    },
                    this.TAG,
                    caller,
                    out
                )
            )

            out.nota = 'I flow girano in background: lanciare pilotReport() dopo qualche secondo.'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    pilotReport: function () {
        var out = { method: 'pilotReport' }
        try {
            out.flow_contexts = this._flowContexts()
            out.approvazioni = this._approvals()
            out.task_sla = this._taskSla()
            out.sys_email = this._emails()
            out.teams = this._teams()
            out.record = {
                incident: this._count('incident', 'correlation_idSTARTSWITH' + this.TAG),
                acquisti: this._count(this.T_ACQ, ''),
                hcx: this._count(this.T_HCX, ''),
            }
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ------------------------------------------------------------------ seed

    seed: function () {
        var out = { method: 'seed', acquisti: 0, hcx: 0, incidents: 0, chiusi: [], warnings: [] }
        try {
            var caller = this._userId('chatdemo.requester', out)
            var groups = this._groupIds(out)

            var acq = [
                { s: 'Rinnovo licenze CRM', supplier: 'Nordwind Software', category: 'software', amount: 6400, budget_residual: 15000, quote_attached: true, caso: 'regolare' },
                { s: 'Server di collaudo', supplier: 'Baltic Hardware', category: 'hardware', amount: 9200, budget_residual: 4000, quote_attached: true, caso: 'BUDGET_EXCEEDED' },
                { s: 'Consulenza migrazione', supplier: 'Delta Consulting', category: 'consulting', amount: 7800, budget_residual: 20000, quote_attached: false, caso: 'QUOTE_MISSING' },
                { s: 'Rinnovo parco notebook', supplier: 'Baltic Hardware', category: 'hardware', amount: 24000, budget_residual: 60000, quote_attached: true, caso: 'HIGH_VALUE' },
                { s: 'Campagna employer branding', supplier: 'Mediana Comm', category: 'marketing', amount: 5200, budget_residual: 12000, quote_attached: true, caso: 'regolare' },
                { s: 'Manutenzione impianti', supplier: 'Facility Pro', category: 'facilities', amount: 3100, budget_residual: 9000, quote_attached: true, caso: 'storico' },
                { s: 'Licenze BI', supplier: 'Nordwind Software', category: 'software', amount: 4300, budget_residual: 11000, quote_attached: true, caso: 'storico' },
                { s: 'Arredi sala riunioni', supplier: 'Facility Pro', category: 'facilities', amount: 2600, budget_residual: 8000, quote_attached: true, caso: 'storico' },
            ]

            var i, res
            for (i = 0; i < acq.length; i++) {
                res = this._createAcq(
                    {
                        short_description: 'CHATDEMO - ' + acq[i].s,
                        supplier: acq[i].supplier,
                        category: acq[i].category,
                        amount: acq[i].amount,
                        budget_residual: acq[i].budget_residual,
                        cost_center: 'CC-DEMO-0' + ((i % 3) + 1),
                        justification: 'Richiesta demo, dati inventati. Caso: ' + acq[i].caso,
                        quote_attached: acq[i].quote_attached,
                    },
                    this.TAG,
                    caller,
                    out
                )
                if (res && res.sys_id) {
                    out.acquisti++
                    if (acq[i].caso === 'storico') out.chiusi.push({ table: this.T_ACQ, sys_id: res.sys_id })
                }
            }

            var hcx = [
                { s: 'Advisory board cardiologia', hcp: 'Dott.ssa Anna Esempio', sp: 'cardiology', ev: 'advisory_board', fee: 1800, fmv: 2500, cv: true, ct: true, caso: 'regolare' },
                { s: 'Speaker congresso oncologia', hcp: 'Dott. Luca Prova', sp: 'oncology', ev: 'speaker', fee: 4200, fmv: 3000, cv: true, ct: true, caso: 'FEE_OVER_FMV' },
                { s: 'Consulenza protocollo', hcp: 'Dott. Marco Finto', sp: 'neurology', ev: 'consultancy', fee: 2200, fmv: 3000, cv: false, ct: true, caso: 'CV_MISSING' },
                { s: 'Partecipazione congresso', hcp: 'Dott.ssa Elisa Test', sp: 'endocrinology', ev: 'congress', fee: 1200, fmv: 2000, cv: true, ct: false, caso: 'CONTRACT_MISSING' },
                { s: 'Advisory board medicina generale', hcp: 'Dott. Paolo Esempio', sp: 'general', ev: 'advisory_board', fee: 1500, fmv: 2200, cv: true, ct: true, caso: 'regolare' },
                { s: 'Speaker webinar', hcp: 'Dott.ssa Sara Prova', sp: 'cardiology', ev: 'speaker', fee: 900, fmv: 1500, cv: true, ct: true, caso: 'storico' },
                { s: 'Consulenza linee guida', hcp: 'Dott. Ivan Finto', sp: 'oncology', ev: 'consultancy', fee: 2600, fmv: 3500, cv: true, ct: true, caso: 'storico' },
                { s: 'Advisory board neurologia', hcp: 'Dott.ssa Nora Test', sp: 'neurology', ev: 'advisory_board', fee: 1900, fmv: 2400, cv: true, ct: true, caso: 'storico' },
            ]

            for (i = 0; i < hcx.length; i++) {
                res = this._createHcx(
                    {
                        short_description: 'CHATDEMO - ' + hcx[i].s,
                        hcp_name: hcx[i].hcp,
                        specialty: hcx[i].sp,
                        event_type: hcx[i].ev,
                        proposed_fee: hcx[i].fee,
                        fmv_max: hcx[i].fmv,
                        cv_received: hcx[i].cv,
                        contract_signed: hcx[i].ct,
                        compliance_check: 'not_started',
                    },
                    this.TAG,
                    caller,
                    out
                )
                if (res && res.sys_id) {
                    out.hcx++
                    if (hcx[i].caso === 'storico') out.chiusi.push({ table: this.T_HCX, sys_id: res.sys_id })
                }
            }

            out.incidents = this._seedIncidents(groups, caller, out)

            // Delega per il test 2: chatdemo.delegate delega chatdemo.approver.
            out.delega = this._ensureDelegate(out)

            out.nota =
                'Le approvazioni nascono dai flow in background. I record marcati storico restano in attesa finche i flow non completano: rilanciare seed() non li duplica solo se la tabella e stata ripulita con reset(true).'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ------------------------------------------------------------------ test

    runTests: function () {
        var out = { method: 'runTests', tests: [] }
        try {
            var approverId = this._userId('chatdemo.approver', out)
            var delegateId = this._userId('chatdemo.delegate', out)
            var requesterId = this._userId('chatdemo.requester', out)

            var imp = this._impersonator(out)
            if (!imp) {
                out.tests.push({ test: 'impersonation', esito: 'NON DISPONIBILE', nota: 'GlideImpersonate non accessibile da questo scope: eseguire runTests() da uno script in scope global.' })
                return this._ok(out)
            }

            var original = gs.getUserID()

            // T1 - l'elenco filtrato contiene solo le due tabelle demo
            try {
                imp.impersonate(approverId)
                var mine = this._myApprovals(true)
                var all = this._myApprovals(false)
                out.tests.push({
                    test: 'T1 approvals/mine solo tabelle demo',
                    filtrate: mine.length,
                    totali_utente: all.length,
                    esito: this._every(mine, this.T_ACQ, this.T_HCX) ? 'OK' : 'KO',
                })
            } catch (e1) {
                out.tests.push({ test: 'T1', esito: 'ERRORE', errore: '' + e1 })
            } finally {
                imp.impersonate(original)
            }

            // T6 / negativo - il requester non legge record altrui ne aggiorna approvazioni non sue
            try {
                imp.impersonate(requesterId)
                var visibili = this._countSecure(this.T_ACQ)
                var altrui = this._firstApprovalNotOf(requesterId)
                var updateVietato = 'non testato'
                if (altrui) {
                    var ga = new GlideRecordSecure('sysapproval_approver')
                    if (ga.get(altrui)) {
                        ga.setValue('state', 'approved')
                        updateVietato = ga.update() ? 'KO: update riuscito' : 'OK: update rifiutato'
                    } else {
                        updateVietato = 'OK: record non leggibile'
                    }
                }
                out.tests.push({
                    test: 'negativo requester',
                    record_acquisto_visibili: visibili,
                    update_approvazione_altrui: updateVietato,
                    esito: visibili === 0 ? 'OK' : 'DA VERIFICARE',
                })
            } catch (e2) {
                out.tests.push({ test: 'negativo requester', esito: 'ERRORE', errore: '' + e2 })
            } finally {
                imp.impersonate(original)
            }

            // T2 - delega attiva
            try {
                imp.impersonate(delegateId)
                out.tests.push({
                    test: 'T2 delega',
                    approvazioni_visibili: this._myApprovals(true).length,
                    esito: 'VERIFICARE con delega attiva creata da seed()',
                })
            } catch (e3) {
                out.tests.push({ test: 'T2 delega', esito: 'ERRORE', errore: '' + e3 })
            } finally {
                imp.impersonate(original)
            }

            out.nota = 'T3, T4 e T5 dipendono dalle API della Fase 4 e vanno eseguiti li.'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ----------------------------------------------------------------- reset

    reset: function (confirm) {
        var out = { method: 'reset', confirm: confirm === true }
        try {
            var conteggi = {
                acquisti: this._count(this.T_ACQ, ''),
                hcx: this._count(this.T_HCX, ''),
                incident: this._count('incident', 'correlation_idSTARTSWITH' + this.TAG),
                approvazioni: this._count('sysapproval_approver', 'source_tableIN' + this.T_ACQ + ',' + this.T_HCX),
                task_sla: this._count('task_sla', 'task.correlation_idSTARTSWITH' + this.TAG),
                delega: this._count('sys_user_delegate', 'user.user_nameSTARTSWITHchatdemo'),
            }
            out.conteggi = conteggi

            if (confirm !== true) {
                out.nota = 'Nessuna cancellazione. Rilanciare con reset(true) per eliminare questi record.'
                return this._ok(out)
            }

            out.cancellati = {
                task_sla: this._purge('task_sla', 'task.correlation_idSTARTSWITH' + this.TAG),
                approvazioni: this._purge('sysapproval_approver', 'source_tableIN' + this.T_ACQ + ',' + this.T_HCX),
                acquisti: this._purge(this.T_ACQ, ''),
                hcx: this._purge(this.T_HCX, ''),
                incident: this._purge('incident', 'correlation_idSTARTSWITH' + this.TAG),
                delega: this._purge('sys_user_delegate', 'user.user_nameSTARTSWITHchatdemo'),
            }
            out.nota = 'Utenti, gruppi, ruoli, ACL e flow non vengono toccati.'
            return this._ok(out)
        } catch (e) {
            return this._err(out, e)
        }
    },

    // ------------------------------------------------------------- interni

    _createAcq: function (vals, tag, caller, out) {
        try {
            var gr = new GlideRecord(this.T_ACQ)
            gr.initialize()
            for (var k in vals) gr.setValue(k, vals[k])
            gr.setValue('correlation_id', tag)
            if (caller) gr.setValue('opened_by', caller)
            gr.setValue('state', 1)
            var id = gr.insert()
            if (!id) {
                out.warnings.push('insert acquisto fallito: ' + vals.short_description)
                return null
            }
            return { sys_id: id, number: gr.getValue('number') }
        } catch (e) {
            out.warnings.push('errore acquisto: ' + e)
            return null
        }
    },

    _createHcx: function (vals, tag, caller, out) {
        try {
            var gr = new GlideRecord(this.T_HCX)
            gr.initialize()
            for (var k in vals) gr.setValue(k, vals[k])
            gr.setValue('correlation_id', tag)
            if (caller) gr.setValue('opened_by', caller)
            gr.setValue('state', 1)
            var id = gr.insert()
            if (!id) {
                out.warnings.push('insert hcx fallito: ' + vals.short_description)
                return null
            }
            return { sys_id: id, number: gr.getValue('number') }
        } catch (e) {
            out.warnings.push('errore hcx: ' + e)
            return null
        }
    },

    _seedIncidents: function (groups, caller, out) {
        var creati = 0
        // Andamento richiesto: picco a settembre, calo a ottobre, risalita a novembre.
        var piano = [
            { mesiFa: 5, n: 20 },
            { mesiFa: 4, n: 22 },
            { mesiFa: 3, n: 26 },
            { mesiFa: 2, n: 42 },
            { mesiFa: 1, n: 18 },
            { mesiFa: 0, n: 24 },
        ]
        for (var p = 0; p < piano.length; p++) {
            for (var i = 0; i < piano[p].n; i++) {
                try {
                    var gr = new GlideRecord('incident')
                    gr.initialize()
                    gr.setValue('short_description', 'CHATDEMO - segnalazione ' + (creati + 1))
                    gr.setValue('correlation_id', this.TAG)
                    gr.setValue('category', ['software', 'hardware', 'network', 'inquiry'][i % 4])
                    gr.setValue('impact', (i % 3) + 1)
                    gr.setValue('urgency', (i % 3) + 1)
                    if (groups.length) gr.setValue('assignment_group', groups[i % groups.length])
                    if (caller) gr.setValue('caller_id', caller)
                    var apertura = new GlideDateTime()
                    apertura.addMonthsLocalTime(-piano[p].mesiFa)
                    apertura.addDaysLocalTime(-(i % 25))
                    gr.setValue('opened_at', apertura.getValue())
                    if (gr.insert()) creati++
                } catch (e) {
                    out.warnings.push('incident seed: ' + e)
                }
            }
        }
        return creati
    },

    _ensureDelegate: function (out) {
        try {
            var approver = this._userId('chatdemo.approver', out)
            var delegate = this._userId('chatdemo.delegate', out)
            if (!approver || !delegate) return 'utenti mancanti'

            var gr = new GlideRecord('sys_user_delegate')
            gr.addQuery('user', approver)
            gr.addQuery('delegate', delegate)
            gr.setLimit(1)
            gr.query()
            if (gr.next()) return 'gia presente'

            var ins = new GlideRecord('sys_user_delegate')
            ins.initialize()
            ins.setValue('user', approver)
            ins.setValue('delegate', delegate)
            ins.setValue('approvals', true)
            var da = new GlideDateTime()
            da.addDaysLocalTime(-1)
            var a = new GlideDateTime()
            a.addDaysLocalTime(90)
            ins.setValue('starts', da.getValue())
            ins.setValue('ends', a.getValue())
            return ins.insert() ? 'creata' : 'insert rifiutato'
        } catch (e) {
            out.warnings.push('delega: ' + e)
            return 'errore'
        }
    },

    _myApprovals: function (soloDemo) {
        var res = []
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('approver', gs.getUserID())
        gr.addQuery('state', 'requested')
        if (soloDemo) gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.setLimit(100)
        gr.query()
        while (gr.next()) {
            res.push({ sys_id: gr.getUniqueValue(), table: gr.getValue('source_table') })
        }
        return res
    },

    _firstApprovalNotOf: function (userId) {
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.addQuery('approver', '!=', userId)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : null
    },

    _countSecure: function (table) {
        var n = 0
        var gr = new GlideRecordSecure(table)
        gr.setLimit(100)
        gr.query()
        while (gr.next()) n++
        return n
    },

    _flowContexts: function () {
        var res = []
        var gr = new GlideRecord('sys_flow_context')
        gr.addEncodedQuery('nameLIKECHATDEMO')
        gr.orderByDesc('sys_created_on')
        gr.setLimit(20)
        gr.query()
        while (gr.next()) {
            res.push({ name: gr.getValue('name'), stato: gr.getDisplayValue('state'), creato: gr.getValue('sys_created_on') })
        }
        return res
    },

    _approvals: function () {
        var res = []
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('source_table', 'IN', this.T_ACQ + ',' + this.T_HCX)
        gr.orderByDesc('sys_created_on')
        gr.setLimit(30)
        gr.query()
        while (gr.next()) {
            res.push({
                sys_id: gr.getUniqueValue(),
                table: gr.getValue('source_table'),
                approver: gr.getDisplayValue('approver'),
                state: gr.getValue('state'),
            })
        }
        return res
    },

    _taskSla: function () {
        var res = { totale: 0, per_definizione: {} }
        var gr = new GlideRecord('task_sla')
        gr.addEncodedQuery('task.correlation_idSTARTSWITH' + this.TAG)
        gr.setLimit(500)
        gr.query()
        while (gr.next()) {
            res.totale++
            var d = gr.getDisplayValue('sla') || 'n/d'
            res.per_definizione[d] = (res.per_definizione[d] || 0) + 1
        }
        return res
    },

    _emails: function () {
        var res = { totale_ultima_ora: 0, per_tipo: {}, esempi: [] }
        var da = new GlideDateTime()
        da.addSeconds(-3600)
        var gr = new GlideRecord('sys_email')
        gr.addQuery('sys_created_on', '>=', da)
        gr.orderByDesc('sys_created_on')
        gr.setLimit(200)
        gr.query()
        while (gr.next()) {
            res.totale_ultima_ora++
            var t = gr.getValue('type') || 'n/d'
            res.per_tipo[t] = (res.per_tipo[t] || 0) + 1
            if (res.esempi.length < 5) {
                res.esempi.push({ subject: (gr.getValue('subject') || '').substring(0, 70), to: gr.getValue('recipients') })
            }
        }
        return res
    },

    _teams: function () {
        try {
            var da = new GlideDateTime()
            da.addSeconds(-3600)
            var gr = new GlideRecord('sn_now_teams_outbound_message')
            gr.addQuery('sys_created_on', '>=', da)
            gr.setLimit(50)
            gr.query()
            var n = 0
            while (gr.next()) n++
            return { tabella: 'sn_now_teams_outbound_message', messaggi_ultima_ora: n }
        } catch (e) {
            return { tabella: 'sn_now_teams_outbound_message', errore: '' + e }
        }
    },

    _groupIds: function (out) {
        var ids = []
        var gr = new GlideRecord('sys_user_group')
        gr.addEncodedQuery('nameSTARTSWITHCHATDEMO')
        gr.setLimit(10)
        gr.query()
        while (gr.next()) ids.push(gr.getUniqueValue())
        if (!ids.length && out && out.warnings) out.warnings.push('nessun gruppo CHATDEMO trovato')
        return ids
    },

    _userId: function (userName, out) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', userName)
        gr.setLimit(1)
        gr.query()
        if (gr.next()) return gr.getUniqueValue()
        if (out && out.warnings) out.warnings.push('utente non trovato: ' + userName)
        return null
    },

    _impersonator: function (out) {
        try {
            return new GlideImpersonate()
        } catch (e) {
            if (out && out.warnings) out.warnings.push('GlideImpersonate non disponibile: ' + e)
            return null
        }
    },

    _every: function (list, t1, t2) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].table !== t1 && list[i].table !== t2) return false
        }
        return true
    },

    _count: function (table, encoded) {
        try {
            var ga = new GlideAggregate(table)
            if (encoded) ga.addEncodedQuery(encoded)
            ga.addAggregate('COUNT')
            ga.query()
            return ga.next() ? parseInt(ga.getAggregate('COUNT'), 10) : 0
        } catch (e) {
            return -1
        }
    },

    _purge: function (table, encoded) {
        try {
            var gr = new GlideRecord(table)
            if (encoded) gr.addEncodedQuery(encoded)
            gr.setLimit(5000)
            gr.query()
            var n = 0
            while (gr.next()) {
                gr.setWorkflow(false)
                if (gr.deleteRecord()) n++
            }
            return n
        } catch (e) {
            return 'errore: ' + e
        }
    },

    _ok: function (out) {
        out.ok = true
        var s = JSON.stringify(out)
        gs.info('[CHATDEMO] ' + s)
        return s
    },

    _err: function (out, e) {
        out.ok = false
        out.errore = '' + e
        var s = JSON.stringify(out)
        gs.error('[CHATDEMO] ' + s)
        return s
    },

    type: 'ChatDemoRunner',
}
