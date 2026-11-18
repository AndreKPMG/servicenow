import { Record } from '@servicenow/sdk/core'

// I gruppi arrivano come metadata dell'app e non dallo script di setup:
// il pre-flight ha mostrato che sys_user_group ha "Can create" = false per gli
// scope esterni, quindi uno script in scope x_kpm95_chatdemo non puo' inserirli.
// Il marcatore per il reset() e' il prefisso del nome, perche' sys_user_group
// non ha correlation_id.

Record({
    $id: Now.ID['grp_service_desk'],
    table: 'sys_user_group',
    data: {
        name: 'CHATDEMO - Service Desk',
        description: 'Gruppo demo Chat Demo. Dati fittizi.',
        active: true,
    },
})

Record({
    $id: Now.ID['grp_applicazioni'],
    table: 'sys_user_group',
    data: {
        name: 'CHATDEMO - Applicazioni',
        description: 'Gruppo demo Chat Demo. Dati fittizi.',
        active: true,
    },
})

Record({
    $id: Now.ID['grp_infrastruttura'],
    table: 'sys_user_group',
    data: {
        name: 'CHATDEMO - Infrastruttura',
        description: 'Gruppo demo Chat Demo. Dati fittizi.',
        active: true,
    },
})

Record({
    $id: Now.ID['grp_sicurezza'],
    table: 'sys_user_group',
    data: {
        name: 'CHATDEMO - Sicurezza',
        description: 'Gruppo demo Chat Demo. Dati fittizi.',
        active: true,
    },
})
