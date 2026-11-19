// Tool delle due skill di riepilogo.
// FORMA OBBLIGATORIA: Now Assist istanzia lo Script Include come classe
// (nel wrapper generato fa ChatDemoApprovalTool.apply(istanza, args)).
// Con la precedente forma a funzione il risultato era
// "ConversionError: The undefined value has no properties".
var ChatDemoApprovalTool = Class.create()

ChatDemoApprovalTool.prototype = {
    initialize: function () {},

    // Verifica che chi chiede sia approvatore o delegato attivo, legge il
    // record e restituisce i soli campi ammessi con gli alert gia' calcolati.
    contesto: function (approvalId) {
        try {
            if (!approvalId) return JSON.stringify({ errore: 'MISSING_INPUT' })
            return JSON.stringify(new ChatDemoApi().skillContext('' + approvalId))
        } catch (e) {
            return JSON.stringify({ errore: 'TOOL_ERROR', messaggio: '' + e })
        }
    },

    type: 'ChatDemoApprovalTool',
}
