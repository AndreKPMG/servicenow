import { ScriptInclude } from '@servicenow/sdk/core'

// Setup idempotente della demo: utenti, assegnazioni di ruolo e valorizzazione
// di x_kpm95_chatdemo.demo_approver. Va eseguito una volta dopo l'install.
// Gruppi e proprieta' restano metadata dell'app: il pre-flight ha mostrato
// "Can create" = false su sys_user_group e sys_properties per gli scope esterni.
export const chatDemoSetup = ScriptInclude({
    $id: Now.ID['si_chatdemo_setup'],
    name: 'ChatDemoSetup',
    description:
        'Crea gli utenti demo senza password, assegna i ruoli e valorizza demo_approver cercando chatdemo.approver per user_name. Rieseguibile.',
    script: Now.include('./ChatDemoSetup.js'),
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
    mobileCallable: false,
})
