import { Property } from '@servicenow/sdk/core'
import { chatdemoAdmin } from '../security/roles.now'

// Valorizzata con l'utenza con cui il CONNETTORE MCP chiama le API: afabbian
// (Andrea Fabbian), verificata sul log di transazione dell'endpoint, non con
// ccandre, che e' solo l'utenza con cui l'SDK autentica l'install.
// Era proprio questo disallineamento a far restituire 0 approvazioni a
// list_my_approvals: l'API risponde a chi chiama, e chi chiama non ne aveva.
// Nota: la proprieta' nasce come metadata (sys_properties ha "Can create" = false
// per gli scope esterni, quindi lo script non puo' crearla da zero).
// Il valore lo scrive ChatDemoSetup cercando l'utente chatdemo.approver per
// user_name: nessun sys_id scritto a mano.
Property({
    $id: Now.ID['prop_demo_approver'],
    name: 'x_kpm95_chatdemo.demo_approver',
    type: 'string',
    value: '26aaf798c338cf906c10a5677a0131c5',
    description:
        'sys_id dell utente che conduce la demo: e quello a cui i flow intestano le 10 approvazioni in attesa.',
    ignoreCache: false,
    roles: {
        write: [chatdemoAdmin],
    },
})
