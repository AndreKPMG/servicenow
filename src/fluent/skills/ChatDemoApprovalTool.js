// Tool delle due skill di riepilogo approvazione.
// Verifica che chi chiede sia approvatore o delegato attivo, legge il record e
// restituisce solo i campi ammessi dell'ambito con gli alert GIA' calcolati:
// il modello non deve fare conti ne' confronti di importi.
function ChatDemoApprovalTool(approvalId) {
    try {
        if (!approvalId) return JSON.stringify({ errore: 'MISSING_INPUT' })
        return JSON.stringify(new ChatDemoApi().skillContext('' + approvalId))
    } catch (e) {
        return JSON.stringify({ errore: 'TOOL_ERROR', messaggio: '' + e })
    }
}
