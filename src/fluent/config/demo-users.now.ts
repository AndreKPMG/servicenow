import { Record } from '@servicenow/sdk/core'
import { chatdemoUser, chatdemoApprover } from '../security/roles.now'

// Utenti demo come metadata dell'app. Era previsto uno script di setup, ma su
// questa istanza non esiste un canale di esecuzione server: auth REST disabilitata
// (401), sys_script_fix senza "run at install" e lo scheduled job resta senza voce
// in sys_trigger, che l'install non riesce a creare (tabella di sistema).
// La consegna via metadata invece funziona, come gia' visto per i gruppi.
// ChatDemoSetup resta installato e idempotente per rieseguire il setup dalla UI.

// Ruolo OOTB approver_user, sys_id letto dall'istanza.
const APPROVER_USER_ROLE = 'debab85bff02110053ccffffffffffb6'

export const userApprover = Record({
    $id: Now.ID['usr_chatdemo_approver'],
    table: 'sys_user',
    data: {
        user_name: 'chatdemo.approver',
        first_name: 'Chat',
        last_name: 'Demo Approver',
        email: 'chatdemo.approver@example.com',
        active: true,
        locked_out: false,
        web_service_access_only: false,
    },
})

export const userDelegate = Record({
    $id: Now.ID['usr_chatdemo_delegate'],
    table: 'sys_user',
    data: {
        user_name: 'chatdemo.delegate',
        first_name: 'Chat',
        last_name: 'Demo Delegate',
        email: 'chatdemo.delegate@example.com',
        active: true,
        locked_out: false,
        web_service_access_only: false,
    },
})

export const userRequester = Record({
    $id: Now.ID['usr_chatdemo_requester'],
    table: 'sys_user',
    data: {
        user_name: 'chatdemo.requester',
        first_name: 'Chat',
        last_name: 'Demo Requester',
        email: 'chatdemo.requester@example.com',
        active: true,
        locked_out: false,
        web_service_access_only: false,
    },
})

Record({
    $id: Now.ID['role_approver_approveruser'],
    table: 'sys_user_has_role',
    data: { user: userApprover, role: APPROVER_USER_ROLE },
})

Record({
    $id: Now.ID['role_approver_chatapprover'],
    table: 'sys_user_has_role',
    data: { user: userApprover, role: chatdemoApprover },
})

Record({
    $id: Now.ID['role_approver_chatuser'],
    table: 'sys_user_has_role',
    data: { user: userApprover, role: chatdemoUser },
})

Record({
    $id: Now.ID['role_delegate_approveruser'],
    table: 'sys_user_has_role',
    data: { user: userDelegate, role: APPROVER_USER_ROLE },
})

Record({
    $id: Now.ID['role_delegate_chatuser'],
    table: 'sys_user_has_role',
    data: { user: userDelegate, role: chatdemoUser },
})

Record({
    $id: Now.ID['role_requester_chatuser'],
    table: 'sys_user_has_role',
    data: { user: userRequester, role: chatdemoUser },
})
