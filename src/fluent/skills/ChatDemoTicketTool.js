// Tool della skill di analisi ticket. Stessa forma a classe: vedi
// ChatDemoApprovalTool per il motivo.
var ChatDemoTicketTool = Class.create()

ChatDemoTicketTool.prototype = {
    initialize: function () {},

    // Soli aggregati CHATDEMO, gia' calcolati lato piattaforma.
    aggregati: function (mesi) {
        try {
            return JSON.stringify(new ChatDemoApi().skillTicketAggregates(mesi))
        } catch (e) {
            return JSON.stringify({ errore: 'TOOL_ERROR', messaggio: '' + e })
        }
    },

    type: 'ChatDemoTicketTool',
}
