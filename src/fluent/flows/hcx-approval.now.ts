import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// Fase 2 - HCx. L'approvatore demo agisce da referente compliance.
// Anche qui l'approvazione nasce dal flow, mai da insert diretti.
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
        const approver = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['act_hcx_lookup_approver'], annotation: 'Trova chatdemo.approver' },
            {
                table: 'sys_user',
                conditions: 'user_name=chatdemo.approver',
            }
        )

        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['act_hcx_ask'], annotation: 'Verifica compliance HCx' },
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
                $id: Now.ID['if_hcx_approved'],
                annotation: 'Approvato',
                condition: `${wfa.dataPill(approval.approval_state, 'string')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['act_hcx_set_approved'] },
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
                $id: Now.ID['if_hcx_rejected'],
                annotation: 'Rifiutato',
                condition: `${wfa.dataPill(approval.approval_state, 'string')}=rejected`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['act_hcx_set_rejected'] },
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
