// Tool della skill di analisi ticket ITSM.
// Restituisce i soli aggregati CHATDEMO gia' calcolati lato piattaforma.
function ChatDemoTicketTool(mesi) {
    try {
        return JSON.stringify(new ChatDemoApi().skillTicketAggregates(mesi))
    } catch (e) {
        return JSON.stringify({ errore: 'TOOL_ERROR', messaggio: '' + e })
    }
}
