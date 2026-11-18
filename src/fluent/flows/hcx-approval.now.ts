import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// Fase 2 - HCx. L'approvatore agisce da referente compliance.
// Instradamento identico agli acquisti: CHATDEMO_TEST -> chatdemo.approver,
// altrimenti la proprieta' demo_approver. Nessun secondo livello.
Flow(
    {
        $id: Now.ID['flow_hcx_approval'],
        name: 'CHATDEMO Approvazione HCx',
        description: 'Richiede la verifica compliance sugli engagement HCx CHATDEMO e ne aggiorna lo stato.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.record.created,
        { $id: Now.ID['trg_hcx_created'] },
        { table: 'x_kpm95_chatdemo_hcp_engage', run_flow_in: 'background' }
    ),
    (params) => {
        const demoApproverProp = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_hcx_lookup_prop'], annotation: 'Legge la proprieta demo_approver' },
            { table: 'sys_properties', conditions: 'name=x_kpm95_chatdemo.demo_approver' }
        )

        const testApprover = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_hcx_lookup_testuser'], annotation: 'Trova chatdemo.approver' },
            { table: 'sys_user', conditions: 'user_name=chatdemo.approver' }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['if_hcx_is_test'],
                annotation: 'Record di test',
                // @ts-ignore wfa.dataPill richiede la dot notation
                condition: `${wfa.dataPill(params.trigger.current.correlation_id, 'string')}STARTSWITHCHATDEMO_TEST`,
            },
            () => {
                const approvalTest = wfa.action(
                    action.core.askForApproval,
                    { $id: Now.ID['act_hcx_ask_test'], annotation: 'Verifica compliance HCx - test' },
                    {
                        record: wfa.dataPill(params.trigger.current, 'reference'),
                        table: 'x_kpm95_chatdemo_hcp_engage',
                        approval_reason: 'Verifica compliance engagement HCx (test CHATDEMO)',
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
                        $id: Now.ID['if_hcx_test_approved'],
                        condition: `${wfa.dataPill(approvalTest.approval_state, 'string')}=approved`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['act_hcx_test_approved'] },
                            {
                                table_name: 'x_kpm95_chatdemo_hcp_engage',
                                record: wfa.dataPill(params.trigger.current, 'reference'),
                                values: TemplateValue({
                                    state: 3,
                                    compliance_check: 'passed',
                                    work_notes: 'CHATDEMO: engagement approvato dal flow di compliance.',
                                }),
                            }
                        )
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['if_hcx_test_rejected'],
                        condition: `${wfa.dataPill(approvalTest.approval_state, 'string')}=rejected`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['act_hcx_test_rejected'] },
                            {
                                table_name: 'x_kpm95_chatdemo_hcp_engage',
                                record: wfa.dataPill(params.trigger.current, 'reference'),
                                values: TemplateValue({
                                    state: 4,
                                    compliance_check: 'failed',
                                    work_notes: 'CHATDEMO: engagement rifiutato dal flow di compliance.',
                                }),
                            }
                        )
                    }
                )
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['else_hcx_is_demo'], annotation: 'Record della demo' }, () => {
            const approvalDemo = wfa.action(
                action.core.askForApproval,
                { $id: Now.ID['act_hcx_ask_demo'], annotation: 'Verifica compliance HCx - demo' },
                {
                    record: wfa.dataPill(params.trigger.current, 'reference'),
                    table: 'x_kpm95_chatdemo_hcp_engage',
                    approval_reason: 'Verifica compliance engagement HCx (demo CHATDEMO)',
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
                    $id: Now.ID['if_hcx_demo_approved'],
                    condition: `${wfa.dataPill(approvalDemo.approval_state, 'string')}=approved`,
                },
                () => {
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['act_hcx_demo_approved'] },
                        {
                            table_name: 'x_kpm95_chatdemo_hcp_engage',
                            record: wfa.dataPill(params.trigger.current, 'reference'),
                            values: TemplateValue({
                                state: 3,
                                compliance_check: 'passed',
                                work_notes: 'CHATDEMO: engagement approvato dal flow di compliance.',
                            }),
                        }
                    )
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['if_hcx_demo_rejected'],
                    condition: `${wfa.dataPill(approvalDemo.approval_state, 'string')}=rejected`,
                },
                () => {
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['act_hcx_demo_rejected'] },
                        {
                            table_name: 'x_kpm95_chatdemo_hcp_engage',
                            record: wfa.dataPill(params.trigger.current, 'reference'),
                            values: TemplateValue({
                                state: 4,
                                compliance_check: 'failed',
                                work_notes: 'CHATDEMO: engagement rifiutato dal flow di compliance.',
                            }),
                        }
                    )
                }
            )
        })
    }
)
