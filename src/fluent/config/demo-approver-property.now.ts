import { Property } from '@servicenow/sdk/core'
import { chatdemoAdmin } from '../security/roles.now'

// Valorizzata con l'utente ccandre (sys_id letto dall'istanza): la demo viene
// condotta con l'utente autenticato sull'alias demo1.
// Nota: la proprieta' nasce come metadata (sys_properties ha "Can create" = false
// per gli scope esterni, quindi lo script non puo' crearla da zero).
// Il valore lo scrive ChatDemoSetup cercando l'utente chatdemo.approver per
// user_name: nessun sys_id scritto a mano.
Property({
    $id: Now.ID['prop_demo_approver'],
    name: 'x_kpm95_chatdemo.demo_approver',
    type: 'string',
    value: 'f45c6290c39bc7507bd96e35990131e2',
    description:
        'sys_id dell utente approvatore della demo (chatdemo.approver). Valorizzata da ChatDemoSetup.run().',
    ignoreCache: false,
    roles: {
        write: [chatdemoAdmin],
    },
})
