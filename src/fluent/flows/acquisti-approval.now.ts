import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// Fase 2 - Acquisti. L'approvazione nasce sempre dal flow.
// Instradamento approvatore:
//   correlation_id che inizia con CHATDEMO_TEST -> chatdemo.approver (record di test)
//   negli altri casi                            -> proprieta' demo_approver (chi conduce la demo)
// Secondo livello sopra 10.000 EUR: sempre a chatdemo.approver.
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
        const demoApproverProp = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_acq_lookup_prop'], annotation: 'Legge la proprieta demo_approver' },
            { table: 'sys_properties', conditions: 'name=x_kpm95_chatdemo.demo_approver' }
        )

        const testApprover = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_acq_lookup_testuser'], annotation: 'Trova chatdemo.approver' },
            { table: 'sys_user', conditions: 'user_name=chatdemo.approver' }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['if_acq_is_test'],
                annotation: 'Record di test',
                // @ts-ignore wfa.dataPill richiede la dot notation
                condition: `${wfa.dataPill(params.trigger.current.correlation_id, 'string')}STARTSWITHCHATDEMO_TEST`,
            },
            () => {
                const approvalTest = wfa.action(
                    action.core.askForApproval,
                    { $id: Now.ID['act_acq_ask_test'], annotation: 'Approvazione acquisto - test' },
                    {
                        record: wfa.dataPill(params.trigger.current, 'reference'),
                        table: 'x_kpm95_chatdemo_purchase_req',
                        approval_reason: 'Approvazione richiesta di acquisto (test CHATDEMO)',
                        approval_conditions: wfa.approvalRules({
                            ruleSets: [
                                {
                                    action: 'ApprovesRejects',
                                    rules: [
                                        [
                                            {
                                                ruleType: 'Any',
                                                users: [wfa.dataPill(testApprover.Record.sys_id, 'reference')],
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
                        $id: Now.ID['if_acq_test_approved'],
                        condition: `${wfa.dataPill(approvalTest.approval_state, 'string')}=approved`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['act_acq_test_approved'] },
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
                        $id: Now.ID['if_acq_test_rejected'],
                        condition: `${wfa.dataPill(approvalTest.approval_state, 'string')}=rejected`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['act_acq_test_rejected'] },
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

        wfa.flowLogic.else({ $id: Now.ID['else_acq_is_demo'], annotation: 'Record della demo' }, () => {
            const approvalDemo = wfa.action(
                action.core.askForApproval,
                { $id: Now.ID['act_acq_ask_demo'], annotation: 'Approvazione acquisto - demo' },
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
                                            users: [wfa.dataPill(demoApproverProp.Record.value, 'reference')],
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
                    $id: Now.ID['if_acq_demo_approved'],
                    condition: `${wfa.dataPill(approvalDemo.approval_state, 'string')}=approved`,
                },
                () => {
                    // Secondo livello sopra 10.000 EUR, sempre a chatdemo.approver.
                    wfa.flowLogic.if(
                        {
                            $id: Now.ID['if_acq_high_value'],
                            annotation: 'Importo oltre 10.000 EUR',
                            // @ts-ignore wfa.dataPill richiede la dot notation
                            condition: `${wfa.dataPill(params.trigger.current.amount, 'string')}>10000`,
                        },
                        () => {
                            wfa.action(
                                action.core.askForApproval,
                                { $id: Now.ID['act_acq_ask_l2'], annotation: 'Secondo livello oltre 10.000 EUR' },
                                {
                                    record: wfa.dataPill(params.trigger.current, 'reference'),
                                    table: 'x_kpm95_chatdemo_purchase_req',
                                    approval_reason: 'Secondo livello: importo oltre 10.000 EUR (CHATDEMO)',
                                    approval_conditions: wfa.approvalRules({
                                        ruleSets: [
                                            {
                                                action: 'ApprovesRejects',
                                                rules: [
                                                    [
                                                        {
                                                            ruleType: 'Any',
                                                            users: [
                                                                wfa.dataPill(testApprover.Record.sys_id, 'reference'),
                                                            ],
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
                        { $id: Now.ID['act_acq_demo_approved'] },
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
                    $id: Now.ID['if_acq_demo_rejected'],
                    condition: `${wfa.dataPill(approvalDemo.approval_state, 'string')}=rejected`,
                },
                () => {
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['act_acq_demo_rejected'] },
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
        })
    }
)
