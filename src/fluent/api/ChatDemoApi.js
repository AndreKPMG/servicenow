var ChatDemoApi = Class.create()

ChatDemoApi.prototype = {
    T_ACQ: 'x_kpm95_chatdemo_purchase_req',
    T_HCX: 'x_kpm95_chatdemo_hcp_engage',
    TAG: 'CHATDEMO',
    ROLE_USER: 'x_kpm95_chatdemo.user',
    SLA_PREFIX: 'CHATDEMO',

    initialize: function () {},

    // ------------------------------------------------------------ KPI ticket

    // Solo aggregati, solo dati CHATDEMO, nessuna data futura, nessun mese
    // fuori dalla finestra richiesta.
    ticketsTrend: function (months, groupBy) {
        var m = this._months(months)
        var campo = this._groupField(groupBy)
        var finestra = this._window(m)

        var serie = {}
        var k
        for (k = 0; k < finestra.chiavi.length; k++) {
            serie[finestra.chiavi[k]] = { mese: finestra.chiavi[k], aperti: 0, chiusi: 0, aperti_per: {} }
        }

        var aperti = new GlideAggregate('incident')
        aperti.addEncodedQuery(
            'correlation_idSTARTSWITH' + this.TAG + '^opened_at>=' + finestra.da + '^opened_at<=' + finestra.a
        )
        aperti.groupBy('opened_at')
        aperti.groupBy(campo)
        aperti.addAggregate('COUNT')
        aperti.query()
        while (aperti.next()) {
            var mese = (aperti.getValue('opened_at') || '').substring(0, 7)
            if (!serie[mese]) continue
            var n = parseInt(aperti.getAggregate('COUNT'), 10) || 0
            serie[mese].aperti += n
            var etichetta = aperti.getDisplayValue(campo) || 'n/d'
            serie[mese].aperti_per[etichetta] = (serie[mese].aperti_per[etichetta] || 0) + n
        }

        var chiusi = new GlideAggregate('incident')
        chiusi.addEncodedQuery(
            'correlation_idSTARTSWITH' + this.TAG + '^resolved_at>=' + finestra.da + '^resolved_at<=' + finestra.a
        )
        chiusi.groupBy('resolved_at')
        chiusi.addAggregate('COUNT')
        chiusi.query()
        while (chiusi.next()) {
            var meseC = (chiusi.getValue('resolved_at') || '').substring(0, 7)
            if (!serie[meseC]) continue
            serie[meseC].chiusi += parseInt(chiusi.getAggregate('COUNT'), 10) || 0
        }

        var perMese = []
        for (k = 0; k < finestra.chiavi.length; k++) perMese.push(serie[finestra.chiavi[k]])

        return {
            periodo: { da: finestra.da, a: finestra.a, mesi: m },
            group_by: groupBy || 'priority',
            per_mese: perMese,
            backlog: this._backlog(campo),
        }
    },

    _backlog: function (campo) {
        var res = { totale: 0, per: {} }
        var ga = new GlideAggregate('incident')
        ga.addEncodedQuery('correlation_idSTARTSWITH' + this.TAG + '^active=true')
        ga.groupBy(campo)
        ga.addAggregate('COUNT')
        ga.query()
        while (ga.next()) {
            var n = parseInt(ga.getAggregate('COUNT'), 10) || 0
            res.totale += n
            res.per[ga.getDisplayValue(campo) || 'n/d'] = n
        }
        return res
    },

    // -------------------------------------------------------------- KPI SLA

    // Solo le definizioni SLA CHATDEMO. I mesi non conclusi sono separati.
    slaPerformance: function (months, groupBy) {
        var m = this._months(months)
        var finestra = this._window(m)
        var campo = this._groupField(groupBy)
        var definizioni = this._chatdemoSlaIds()

        if (!definizioni.length) {
            return {
                periodo: { da: finestra.da, a: finestra.a, mesi: m },
                avviso: 'Nessuna definizione SLA CHATDEMO trovata',
                per_mese: [],
            }
        }

        var serie = {}
        var k
        for (k = 0; k < finestra.chiavi.length; k++) {
            serie[finestra.chiavi[k]] = {
                mese: finestra.chiavi[k],
                totale: 0,
                breached: 0,
                in_corso: 0,
                percentuale_rispetto: null,
                per: {},
                mese_concluso: finestra.chiavi[k] !== finestra.meseCorrente,
            }
        }

        // group_by veniva calcolato e poi ignorato: la risposta aveva solo il
        // totale. Qui si costruisce prima una mappa task -> valore del campo,
        // con una sola lettura degli incident CHATDEMO, e poi la si usa nel
        // ciclo sui task_sla: niente dot-walk e niente letture per riga.
        var valorePerTask = {}
        var inc = new GlideRecord('incident')
        inc.addEncodedQuery('correlation_idSTARTSWITH' + this.TAG)
        inc.setLimit(5000)
        inc.query()
        while (inc.next()) {
            var v = inc.getDisplayValue(campo)
            valorePerTask[inc.getUniqueValue()] = v || '(non impostato)'
        }

        var gr = new GlideRecord('task_sla')
        gr.addEncodedQuery(
            'slaIN' + definizioni.join(',') + '^start_time>=' + finestra.da + '^start_time<=' + finestra.a
        )
        gr.setLimit(5000)
        gr.query()
        while (gr.next()) {
            var mese = (gr.getValue('start_time') || '').substring(0, 7)
            if (!serie[mese]) continue
            serie[mese].totale++
            var sforato = this._bool(gr, 'has_breached')
            var attivo = this._bool(gr, 'active')
            if (sforato) serie[mese].breached++
            if (attivo) serie[mese].in_corso++

            var gruppo = valorePerTask[gr.getValue('task')] || '(fuori perimetro)'
            if (!serie[mese].per[gruppo]) {
                serie[mese].per[gruppo] = { totale: 0, breached: 0, in_corso: 0, percentuale_rispetto: null }
            }
            var riga = serie[mese].per[gruppo]
            riga.totale++
            if (sforato) riga.breached++
            if (attivo) riga.in_corso++
        }

        var perMese = []
        for (k = 0; k < finestra.chiavi.length; k++) {
            var riga = serie[finestra.chiavi[k]]
            if (riga.totale > 0) {
                riga.percentuale_rispetto = Math.round(((riga.totale - riga.breached) / riga.totale) * 1000) / 10
            }
            for (var g in riga.per) {
                var rg = riga.per[g]
                if (rg.totale > 0) {
                    rg.percentuale_rispetto = Math.round(((rg.totale - rg.breached) / rg.totale) * 1000) / 10
                }
            }
            perMese.push(riga)
        }

        return {
            periodo: { da: finestra.da, a: finestra.a, mesi: m, mese_corrente_non_concluso: finestra.meseCorrente },
            group_by: groupBy || 'priority',
            definizioni_considerate: definizioni.length,
            per_mese: perMese,
        }
    },

    _chatdemoSlaIds: function () {
        var ids = []
        var gr = new GlideRecord('contract_sla')
        gr.addEncodedQuery('nameSTARTSWITH' + this.SLA_PREFIX)
        gr.setLimit(50)
        gr.query()
        while (gr.next()) ids.push(gr.getUniqueValue())
        return ids
    },

    // ------------------------------------------------------- approvazioni

    // Solo le approvazioni delle due tabelle demo: le altre assegnate allo
    // stesso utente non devono comparire.
    approvalsMine: function (ambito) {
        var tabelle = this._tablesFor(ambito)
        if (!tabelle) return { errore: 'AMBITO_NON_VALIDO', ambiti: ['acquisti', 'hcx'] }

        var me = gs.getUserID()
        var deleganti = this._delegantiAttivi(me)
        var approvatori = [me].concat(deleganti)

        var res = []
        var gr = new GlideRecord('sysapproval_approver')
        gr.addQuery('source_table', 'IN', tabelle.join(','))
        gr.addQuery('state', 'requested')
        gr.addQuery('approver', 'IN', approvatori.join(','))
        gr.orderByDesc('sys_created_on')
        gr.setLimit(100)
        gr.query()

        while (gr.next()) {
            var tabella = gr.getValue('source_table')
            var dettaglio = this._recordDetail(tabella, gr.getValue('sysapproval'))
            res.push({
                approval_sys_id: gr.getUniqueValue(),
                ambito: tabella === this.T_ACQ ? 'acquisti' : 'hcx',
                numero: dettaglio.numero,
                titolo: dettaglio.titolo,
                richiedente: dettaglio.richiedente,
                data: gr.getValue('sys_created_on'),
                importo: dettaglio.importo,
                delegata: gr.getValue('approver') !== me,
            })
        }
        return { totale: res.length, approvazioni: res }
    },

    _recordDetail: function (tabella, recordId) {
        var out = { numero: '', titolo: '', richiedente: '', importo: null }
        var gr = new GlideRecord(tabella)
        if (!gr.get(recordId)) return out
        out.numero = gr.getValue('number')
        out.titolo = gr.getValue('short_description')
        out.richiedente = gr.getDisplayValue('opened_by')
        out.importo = tabella === this.T_ACQ ? gr.getValue('amount') : gr.getValue('proposed_fee')
        return out
    },

    _delegantiAttivi: function (me) {
        var ids = []
        var nowStr = new GlideDateTime().getValue()
        var gr = new GlideRecord('sys_user_delegate')
        gr.addQuery('delegate', me)
        gr.addQuery('approvals', true)
        gr.setLimit(100)
        gr.query()
        while (gr.next()) {
            var starts = gr.getValue('starts')
            var ends = gr.getValue('ends')
            if ((!starts || starts <= nowStr) && (!ends || ends >= nowStr)) ids.push(gr.getValue('user'))
        }
        return ids
    },

    // --------------------------------------------------------- decisione

    // Controlli nell'ordine previsto, poi una sola scrittura con stato e
    // commento insieme, poi rilettura del record.
    decide: function (approvalId, decision, comment) {
        if (decision !== 'approved' && decision !== 'rejected') {
            return { http: 400, codice: 'INVALID_DECISION' }
        }
        var commento = (comment === null || comment === undefined ? '' : '' + comment).trim()
        if (decision === 'rejected' && !commento) {
            return { http: 400, codice: 'COMMENT_REQUIRED' }
        }

        var gr = new GlideRecord('sysapproval_approver')
        if (!gr.get(approvalId)) {
            return { http: 404, codice: 'NOT_FOUND' }
        }
        var tabella = gr.getValue('source_table')
        if (tabella !== this.T_ACQ && tabella !== this.T_HCX) {
            return { http: 404, codice: 'NOT_FOUND' }
        }

        var me = gs.getUserID()
        var ammessi = [me].concat(this._delegantiAttivi(me))
        if (ammessi.indexOf(gr.getValue('approver')) < 0) {
            return { http: 403, codice: 'NOT_APPROVER' }
        }
        if (gr.getValue('state') !== 'requested') {
            return { http: 409, codice: 'NOT_PENDING', stato_attuale: gr.getValue('state') }
        }

        // Stato e commento nello stesso update.
        gr.setValue('state', decision)
        if (commento) gr.setValue('comments', commento)
        gr.update()

        var riletto = new GlideRecord('sysapproval_approver')
        if (!riletto.get(approvalId) || riletto.getValue('state') !== decision) {
            return { http: 500, codice: 'STATE_NOT_CHANGED' }
        }

        return {
            http: 200,
            codice: 'OK',
            approval_sys_id: approvalId,
            esito: decision,
            stato_riletto: riletto.getValue('state'),
            commento_salvato: riletto.getValue('comments') || '',
        }
    },


    // ------------------------------------------- contesto per le Now Assist skill

    // Tool script delle skill di riepilogo: verifica che l'utente sia approvatore
    // o delegato, legge il record, restituisce SOLO i campi ammessi dell'ambito e
    // calcola gli alert. Il modello non fa calcoli.
    skillContext: function (approvalSysId) {
        var gr = new GlideRecord('sysapproval_approver')
        if (!gr.get(approvalSysId)) return { errore: 'NOT_FOUND' }

        var tabella = gr.getValue('source_table')
        if (tabella !== this.T_ACQ && tabella !== this.T_HCX) return { errore: 'NOT_FOUND' }

        var me = gs.getUserID()
        var ammessi = [me].concat(this._delegantiAttivi(me))
        if (ammessi.indexOf(gr.getValue('approver')) < 0) return { errore: 'NOT_APPROVER' }

        var rec = new GlideRecord(tabella)
        if (!rec.get(gr.getValue('sysapproval'))) return { errore: 'NOT_FOUND' }

        return tabella === this.T_ACQ ? this._contestoAcquisti(rec) : this._contestoHcx(rec)
    },

    _contestoAcquisti: function (rec) {
        var importo = parseFloat(rec.getValue('amount') || '0')
        var budget = parseFloat(rec.getValue('budget_residual') || '0')
        var preventivo = this._bool(rec, 'quote_attached')
        var alert = []
        if (importo > budget) alert.push('BUDGET_EXCEEDED')
        if (!preventivo) alert.push('QUOTE_MISSING')
        if (importo > 10000) alert.push('HIGH_VALUE')

        var mancanti = []
        if (!rec.getValue('supplier')) mancanti.push('fornitore')
        if (!rec.getValue('cost_center')) mancanti.push('centro di costo')
        if (!rec.getValue('justification')) mancanti.push('motivazione')

        return {
            ambito: 'acquisti',
            numero: rec.getValue('number'),
            titolo: rec.getValue('short_description'),
            richiedente: rec.getDisplayValue('opened_by'),
            fornitore: rec.getValue('supplier'),
            categoria: rec.getDisplayValue('category'),
            importo: importo,
            budget_residuo: budget,
            centro_di_costo: rec.getValue('cost_center'),
            motivazione: rec.getValue('justification'),
            preventivo_allegato: preventivo,
            alert: alert,
            dati_mancanti: mancanti,
        }
    },

    _contestoHcx: function (rec) {
        var compenso = parseFloat(rec.getValue('proposed_fee') || '0')
        var fmv = parseFloat(rec.getValue('fmv_max') || '0')
        var cv = this._bool(rec, 'cv_received')
        var contratto = this._bool(rec, 'contract_signed')
        var alert = []
        if (compenso > fmv) alert.push('FEE_OVER_FMV')
        if (!cv) alert.push('CV_MISSING')
        if (!contratto) alert.push('CONTRACT_MISSING')

        var mancanti = []
        if (!rec.getValue('hcp_name')) mancanti.push('nome HCP')
        if (!rec.getValue('event_date')) mancanti.push('data evento')
        if (!rec.getValue('specialty')) mancanti.push('specializzazione')

        return {
            ambito: 'hcx',
            numero: rec.getValue('number'),
            titolo: rec.getValue('short_description'),
            richiedente: rec.getDisplayValue('opened_by'),
            hcp: rec.getValue('hcp_name'),
            specializzazione: rec.getDisplayValue('specialty'),
            tipo_evento: rec.getDisplayValue('event_type'),
            data_evento: rec.getValue('event_date'),
            compenso_proposto: compenso,
            fair_market_value: fmv,
            cv_ricevuto: cv,
            contratto_firmato: contratto,
            verifica_compliance: rec.getDisplayValue('compliance_check'),
            alert: alert,
            dati_mancanti: mancanti,
        }
    },

    // Aggregati gia' calcolati per la skill di analisi ticket.
    skillTicketAggregates: function (months) {
        return this.ticketsTrend(months, 'assignment_group')
    },

    // ----------------------------------------------------------- interni

    // getValue() su un campo booleano restituisce '1' o '0', NON 'true'.
    // Confrontare con 'true' fa leggere ogni booleano come falso: era la causa
    // di breach e in_corso sempre a zero e degli alert QUOTE_MISSING,
    // CV_MISSING e CONTRACT_MISSING sempre accesi.
    _bool: function (gr, campo) {
        var v = gr.getValue(campo)
        return v === '1' || v === 'true' || v === true
    },


    _months: function (months) {
        var m = parseInt(months, 10)
        if (isNaN(m) || m < 1) m = 6
        if (m > 12) m = 12
        return m
    },

    _groupField: function (groupBy) {
        var ammessi = { priority: 'priority', state: 'state', category: 'category', assignment_group: 'assignment_group' }
        return ammessi[groupBy] || 'priority'
    },

    _tablesFor: function (ambito) {
        if (!ambito) return [this.T_ACQ, this.T_HCX]
        if (ambito === 'acquisti') return [this.T_ACQ]
        if (ambito === 'hcx') return [this.T_HCX]
        return null
    },

    // Finestra chiusa a ora: mai date future, mai mesi fuori dai months richiesti.
    _window: function (months) {
        var fine = new GlideDateTime()
        var inizio = new GlideDateTime()
        inizio.addMonthsLocalTime(-(months - 1))
        var primo = inizio.getValue().substring(0, 7) + '-01 00:00:00'

        var chiavi = []
        var cur = new GlideDateTime(primo)
        for (var i = 0; i < months; i++) {
            chiavi.push(cur.getValue().substring(0, 7))
            cur.addMonthsLocalTime(1)
        }

        return {
            da: primo,
            a: fine.getValue(),
            chiavi: chiavi,
            meseCorrente: fine.getValue().substring(0, 7),
        }
    },

    type: 'ChatDemoApi',
}
