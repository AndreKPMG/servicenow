import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// Fase 2 - Acquisti. L'approvazione nasce dal flow: nessun insert diretto in
// sysapproval_approver. L'approvatore e' risolto cercando chatdemo.approver per
// user_name, quindi nessun sys_id scritto a mano.
// runAs system perche' la scrittura sulle tabelle demo e' riservata all'admin.
Flow(
    {
        $id: Now.ID['flow_acq_approval'],
        name: 'CHATDEMO Approvazione acquisti',
        description: 'Richiede approvazione sulle richieste di acquisto CHATDEMO e ne aggiorna lo stato.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.record.created,
        { $id: Now.ID['trg_acq_created'] },
        { table: 'x_kpm95_chatdemo_purchase_req', run_flow_in: 'background' }
    ),
    (params) => {
        const approver = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_acq_lookup_approver'], annotation: 'Trova chatdemo.approver' },
            {
                table: 'sys_user',
                conditions: 'user_name=chatdemo.approver',
            }
        )

        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['act_acq_ask'], annotation: 'Approvazione acquisto - primo livello' },
            {
                record: wfa.dataPill(params.trigger.current, 'reference'),
                table: 'x_kpm95_chatdemo_purchase_req',
                approval_reason: 'Approvazione richiesta di acquisto (demo CHATDEMO)',
                approval_conditions: wfa.approvalRules({
                    ruleSets: [
                        {
                            action: 'ApprovesRejects',
                            rules: [
                                [
                                    {
                                        ruleType: 'Any',
                                        users: [wfa.dataPill(approver.Record.sys_id, 'reference')],
                                        manual: false,
                                    },
                                ],
                            ],
                        },
                    ],
                }),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['if_acq_approved'],
                annotation: 'Primo livello approvato',
                condition: `${wfa.dataPill(approval.approval_state, 'string')}=approved`,
            },
            () => {
                // Secondo livello obbligatorio sopra 10.000 EUR.
                wfa.flowLogic.if(
                    {
                        $id: Now.ID['if_acq_high_value'],
                        annotation: 'Importo oltre 10.000 EUR',
                        // @ts-ignore wfa.dataPill richiede la dot notation, TS la segnala come index signature
                condition: `${wfa.dataPill(params.trigger.current.amount, 'string')}>10000`,
                    },
                    () => {
                        wfa.action(
                            action.core.askForApproval,
                            { $id: Now.ID['act_acq_ask_l2'], annotation: 'Approvazione acquisto - secondo livello' },
                            {
                                record: wfa.dataPill(params.trigger.current, 'reference'),
                                table: 'x_kpm95_chatdemo_purchase_req',
                                approval_reason: 'Secondo livello: importo oltre 10.000 EUR (demo CHATDEMO)',
                                approval_conditions: wfa.approvalRules({
                                    ruleSets: [
                                        {
                                            action: 'ApprovesRejects',
                                            rules: [
                                                [
                                                    {
                                                        ruleType: 'Any',
                                                        users: [wfa.dataPill(approver.Record.sys_id, 'reference')],
                                                        manual: false,
                                                    },
                                                ],
                                            ],
                                        },
                                    ],
                                }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['act_acq_set_approved'] },
                    {
                        table_name: 'x_kpm95_chatdemo_purchase_req',
                        record: wfa.dataPill(params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 3,
                            work_notes: 'CHATDEMO: richiesta approvata dal flow di approvazione.',
                        }),
                    }
                )
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['if_acq_rejected'],
                annotation: 'Rifiutato',
                condition: `${wfa.dataPill(approval.approval_state, 'string')}=rejected`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['act_acq_set_rejected'] },
                    {
                        table_name: 'x_kpm95_chatdemo_purchase_req',
                        record: wfa.dataPill(params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 4,
                            work_notes: 'CHATDEMO: richiesta rifiutata dal flow di approvazione.',
                        }),
                    }
                )
            }
        )
    }
)
