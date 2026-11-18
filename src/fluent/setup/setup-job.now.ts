import { Record } from '@servicenow/sdk/core'

// Unico canale di esecuzione server disponibile: l'auth REST e' disabilitata (401)
// e sys_script_fix non ha un "run at install". Lo scheduled job pero' non basta da
// solo: l'install dei metadata non esegue le business rule che creano la voce in
// sys_trigger, quindi il job resterebbe senza innesco. Qui la voce viene fornita
// esplicitamente, di tipo "once" e gia' scaduta, cosi' lo scheduler la esegue subito
// e la consuma.
export const setupJob = Record({
    $id: Now.ID['job_chatdemo_setup'],
    table: 'sysauto_script',
    data: {
        name: 'CHATDEMO - Setup runner',
        active: true,
        run_type: 'once',
        run_start: '2026-11-18 00:00:00',
        run_dayofmonth: 1,
        conditional: false,
        script: `gs.info('[CHATDEMO][setup] avvio');
var setup = new ChatDemoSetup();
gs.info('[CHATDEMO][setup] ' + setup.run());
gs.info('[CHATDEMO][setup] fine');`,
    },
})

Record({
    $id: Now.ID['trg_chatdemo_setup'],
    table: 'sys_trigger',
    data: {
        name: 'CHATDEMO - Setup runner',
        document: 'sysauto_script',
        document_key: setupJob,
        trigger_type: 0,
        state: 0,
        next_action: '2026-11-18 00:00:00',
        upgrade_safe: false,
    },
})
