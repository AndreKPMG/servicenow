import { Role } from '@servicenow/sdk/core'

// I tre ruoli della demo. Il $id non si usa piu': l'identita' deriva dal nome.
export const chatdemoUser = Role({
    name: 'x_kpm95_chatdemo.user',
    description: 'Utente Chat Demo: richiesto dalle API KPI, che restituiscono solo aggregati CHATDEMO.',
})

export const chatdemoApprover = Role({
    name: 'x_kpm95_chatdemo.approver',
    description: 'Approvatore Chat Demo: destinatario delle approvazioni di Acquisti e HCx.',
})

export const chatdemoAdmin = Role({
    name: 'x_kpm95_chatdemo.admin',
    description: 'Amministratore Chat Demo: unico ruolo con accesso in scrittura alle tabelle della demo.',
    containsRoles: [chatdemoUser, chatdemoApprover],
})
