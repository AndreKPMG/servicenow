import { Sla } from '@servicenow/sdk/core'

// SLA della demo: agganciate a correlation_id, non al gruppo, perche' una regola
// preesistente puo' spostare l'assignment_group degli incident.
// Schedule 8-5 weekdays (sys_id letto dall'istanza), richiesta dall'API Sla.

export const chatdemoSlaResponse = Sla({
    $id: Now.ID['sla_chatdemo_response'],
    name: 'CHATDEMO - Risposta',
    table: 'incident',
    type: 'SLA',
    target: 'response',
    active: true,
    schedule: '08fcd0830a0a0b2600079f56b1adb9ae',
    duration: Duration({ hours: 4 }),
    conditions: {
        start: 'correlation_idSTARTSWITHCHATDEMO^state=1',
        stop: 'state!=1',
    },
})

export const chatdemoSlaResolution = Sla({
    $id: Now.ID['sla_chatdemo_resolution'],
    name: 'CHATDEMO - Risoluzione',
    table: 'incident',
    type: 'SLA',
    target: 'resolution',
    active: true,
    schedule: '08fcd0830a0a0b2600079f56b1adb9ae',
    duration: Duration({ days: 2 }),
    conditions: {
        start: 'correlation_idSTARTSWITHCHATDEMO^active=true',
        stop: 'state=6^ORstate=7',
    },
})
