import { Property } from '@servicenow/sdk/core'
import { chatdemoAdmin } from '../security/roles.now'

// La proprieta' nasce vuota come metadata (sys_properties ha "Can create" = false
// per gli scope esterni, quindi lo script non puo' crearla da zero).
// Il valore lo scrive ChatDemoSetup cercando l'utente chatdemo.approver per
// user_name: nessun sys_id scritto a mano.
Property({
    $id: Now.ID['prop_demo_approver'],
    name: 'x_kpm95_chatdemo.demo_approver',
    type: 'string',
    value: '',
    description:
        'sys_id dell utente approvatore della demo (chatdemo.approver). Valorizzata da ChatDemoSetup.run().',
    ignoreCache: false,
    roles: {
        write: [chatdemoAdmin],
    },
})
