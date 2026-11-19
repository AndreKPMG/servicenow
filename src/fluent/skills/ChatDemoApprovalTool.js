// Tool delle due skill di riepilogo.
// FORMA OBBLIGATORIA: Now Assist istanzia lo Script Include come classe e ne
// invoca un metodo; la capability definition generata dal wizard si chiama
// <sysId>_ChatDemoApprovalTool.ChatDemoApprovalTool, quindi il metodo deve
// avere lo STESSO NOME dello Script Include.
// Con la vecchia forma a funzione l'esito era
// "ConversionError: The undefined value has no properties".
var ChatDemoApprovalTool = Class.create()

ChatDemoApprovalTool.prototype = {
    initialize: function () {},

    // Verifica che chi chiede sia approvatore o delegato attivo, legge il
    // record e restituisce i soli campi ammessi con gli alert gia' calcolati.
    ChatDemoApprovalTool: function (approvalId) {
        try {
            if (!approvalId) return JSON.stringify({ errore: 'MISSING_INPUT' })
            return JSON.stringify(new ChatDemoApi().skillContext('' + approvalId))
        } catch (e) {
            return JSON.stringify({ errore: 'TOOL_ERROR', messaggio: '' + e })
        }
    },

    type: 'ChatDemoApprovalTool',
}
