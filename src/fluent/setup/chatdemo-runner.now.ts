import { ScriptInclude } from '@servicenow/sdk/core'

// Runner della demo, da lanciare da Scripts - Background.
// accessibleFrom public cosi' la stessa riga funziona sia in scope Chat Demo
// sia in global: new x_kpm95_chatdemo.ChatDemoRunner().pilot()
// Ogni metodo restituisce un JSON sintetico e cattura gli errori invece di interrompersi.
export const chatDemoRunner = ScriptInclude({
    $id: Now.ID['si_chatdemo_runner'],
    name: 'ChatDemoRunner',
    description:
        'pilot(), pilotReport(), seed(), runTests(), reset(confirm) per la demo CHATDEMO. Ogni metodo stampa un JSON.',
    script: Now.include('./ChatDemoRunner.js'),
    active: true,
    accessibleFrom: 'public',
    callerAccess: 'tracking',
    clientCallable: false,
    mobileCallable: false,
})
