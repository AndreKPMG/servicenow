import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_hcp_create: {
                        table: 'sys_security_acl'
                        id: 'f7250a78a40242dd821ee551a8c75b6c'
                    }
                    acl_hcp_delete: {
                        table: 'sys_security_acl'
                        id: '8045c95386d641a4babd5cb9fd5a2c62'
                    }
                    acl_hcp_read_admin: {
                        table: 'sys_security_acl'
                        id: '80a5791315024c0e99a5e4c8d98eb79c'
                    }
                    acl_hcp_read_approver: {
                        table: 'sys_security_acl'
                        id: '8e98cd64b0af4f6eb71c591f5f3ff373'
                    }
                    acl_hcp_read_delegate: {
                        table: 'sys_security_acl'
                        id: '39cbcb94c0a04c88b21248c3583f4649'
                    }
                    acl_hcp_read_opened_by: {
                        table: 'sys_security_acl'
                        id: '495be0fc83ea4eaf885596bab35d6268'
                    }
                    acl_hcp_write: {
                        table: 'sys_security_acl'
                        id: 'a833bf8091d749958bb4d29f7053dc2d'
                    }
                    acl_purchase_create: {
                        table: 'sys_security_acl'
                        id: 'd76eb48cf60246bca93da3ce565135ff'
                    }
                    acl_purchase_delete: {
                        table: 'sys_security_acl'
                        id: '525933acdf4d4e52916cb5761dbdca42'
                    }
                    acl_purchase_read_admin: {
                        table: 'sys_security_acl'
                        id: '7ca2e63c1c7f45499b488740592db42b'
                    }
                    acl_purchase_read_approver: {
                        table: 'sys_security_acl'
                        id: '01d6e1e991774b618f5e99cf346c9c9b'
                    }
                    acl_purchase_read_delegate: {
                        table: 'sys_security_acl'
                        id: 'ce3da1548320431d90d7bb87af86a388'
                    }
                    acl_purchase_read_opened_by: {
                        table: 'sys_security_acl'
                        id: 'af37c503059d492b8293f7b926dbbf43'
                    }
                    acl_purchase_write: {
                        table: 'sys_security_acl'
                        id: '8a1d5c3c63a943faa413cbe301f95916'
                    }
                    act_acq_ask: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'eb2c828a7311429ca1bb50893ba4e312'
                        deleted: true
                    }
                    act_acq_ask_demo: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b3e6c0a8284548b884f46454a58b083f'
                    }
                    act_acq_ask_l2: {
                        table: 'sys_hub_action_instance_v2'
                        id: '9263efb49c1d4efb898372713160b21b'
                    }
                    act_acq_ask_test: {
                        table: 'sys_hub_action_instance_v2'
                        id: '85c4132073c64d0cb417aa89bdac2856'
                    }
                    act_acq_demo_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c308ad9926634d5bacf829de26601259'
                    }
                    act_acq_demo_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: '3bc1854e197b4906b2c7f26ca5adc66c'
                    }
                    act_acq_lookup_approver: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'cc16c44be0344d33a2d0092e0bf534a3'
                        deleted: true
                    }
                    act_acq_lookup_prop: {
                        table: 'sys_hub_action_instance_v2'
                        id: '1a253dd8b3834dff8ea089a37f2c84f6'
                    }
                    act_acq_lookup_testuser: {
                        table: 'sys_hub_action_instance_v2'
                        id: '488d359be40b44cf81e7e630ea78d733'
                    }
                    act_acq_set_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: '6aec07a8309c4c848926d17cd110b2ba'
                        deleted: true
                    }
                    act_acq_set_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fb66601eb96244e8a709f95d5b3228ff'
                        deleted: true
                    }
                    act_acq_test_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: '4cba9f19f39e4974be628ea1654f2251'
                    }
                    act_acq_test_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: '1c133cbdc6264510b53627b867de70b6'
                    }
                    act_hcx_ask: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f6380826cccb4573a449b28be1a04d2b'
                        deleted: true
                    }
                    act_hcx_ask_demo: {
                        table: 'sys_hub_action_instance_v2'
                        id: '18f7014faaed4d4f9adc2c47abd1dae5'
                    }
                    act_hcx_ask_test: {
                        table: 'sys_hub_action_instance_v2'
                        id: '346aa25e0cf64277ba1c3d530d855efb'
                    }
                    act_hcx_demo_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fbb3efcf78cc456e87be538cd48676d9'
                    }
                    act_hcx_demo_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: '79798a5758c04e258f48e7d82780dc14'
                    }
                    act_hcx_lookup_approver: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ef7ed34a76d34792aaa80e37a23cc1ef'
                        deleted: true
                    }
                    act_hcx_lookup_prop: {
                        table: 'sys_hub_action_instance_v2'
                        id: '97eee64836794f818c4129e2720c13ad'
                    }
                    act_hcx_lookup_testuser: {
                        table: 'sys_hub_action_instance_v2'
                        id: '3888d0b89f6347fbbc300aeee7489fd4'
                    }
                    act_hcx_set_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c7edb22336fd4cb4a6fa4aeed3eb8b82'
                        deleted: true
                    }
                    act_hcx_set_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: '85c55b1fe7304cb8a4619ee8fb4e5ea9'
                        deleted: true
                    }
                    act_hcx_test_approved: {
                        table: 'sys_hub_action_instance_v2'
                        id: '22ff396c65b94b77b014f49270409eca'
                    }
                    act_hcx_test_rejected: {
                        table: 'sys_hub_action_instance_v2'
                        id: '49c2d561ce484fe7aae5db93d1f85814'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '30879ef3d4454e9fa7a6166fe6023022'
                    }
                    else_acq_is_demo: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b9ea149eba2f4cedbd03c840ca3805b9'
                    }
                    else_hcx_is_demo: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'bec1fa000ea34e3f939a917d7b915660'
                    }
                    flow_acq_approval: {
                        table: 'sys_hub_flow'
                        id: 'e60f581b9ed248d9a7b2f616e35a8a55'
                    }
                    flow_hcx_approval: {
                        table: 'sys_hub_flow'
                        id: '455bb2da748742239335c6f4f6825dde'
                    }
                    grp_applicazioni: {
                        table: 'sys_user_group'
                        id: '20c7670b76314461b05f068dd70e8f4e'
                    }
                    grp_infrastruttura: {
                        table: 'sys_user_group'
                        id: '67148cde7ae2439bb4f3ca02731f4f60'
                    }
                    grp_service_desk: {
                        table: 'sys_user_group'
                        id: '1fe41bc5707a435cbeec43c0b7eaafac'
                    }
                    grp_sicurezza: {
                        table: 'sys_user_group'
                        id: '362f9b196b3147b7b95c2e361e58aa65'
                    }
                    if_acq_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '837c3cdc8fdc4c5b9e44d98b75aa44c2'
                        deleted: true
                    }
                    if_acq_demo_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '89b21270934242e0af9689c1ca793065'
                    }
                    if_acq_demo_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '0ef4edac52bd41579837790f98d16a26'
                    }
                    if_acq_high_value: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '1a1f8b8336ca4b139e90ca1e32de4e88'
                    }
                    if_acq_is_test: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '45647623fac942e2a7a317705835d436'
                    }
                    if_acq_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd2a1edb3401b4eb0a45c103c616f4a89'
                        deleted: true
                    }
                    if_acq_test_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'dfd21d89dd884d81ac013a2849c203f5'
                    }
                    if_acq_test_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '8c06542c6e8a481683c0aa6daeb204e4'
                    }
                    if_hcx_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a5c8462e3f0b4449bbe1f78e9827b587'
                        deleted: true
                    }
                    if_hcx_demo_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'cc0230e0efea4c6da915f3196e44611a'
                    }
                    if_hcx_demo_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ef714263570b4dfcb6770a75285007c7'
                    }
                    if_hcx_is_test: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '90b92cef87d143b3947411f5b027e046'
                    }
                    if_hcx_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '098865578f864bbeaa0a1bbb121a5396'
                        deleted: true
                    }
                    if_hcx_test_approved: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '3c54f32cdbac49dd844f5ca718cdd04d'
                    }
                    if_hcx_test_rejected: {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '65b4c68a61c14f53a291fc4898a3bac9'
                    }
                    job_chatdemo_setup: {
                        table: 'sysauto_script'
                        id: 'bc6ff86fd50a4d40a47fe0eac290c58a'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '53879dc90c68438a9d6729c2d302e26a'
                    }
                    pilot_acq_probe: {
                        table: 'x_kpm95_chatdemo_purchase_req'
                        id: '6c5e31d98bb1466a9e9ef06d25bc24ba'
                        deleted: true
                    }
                    prop_demo_approver: {
                        table: 'sys_properties'
                        id: '0aaada9756af4f4ab1f9032dc549596e'
                    }
                    role_approver_approveruser: {
                        table: 'sys_user_has_role'
                        id: 'f1f74eff9e744a96a78590954212f71d'
                    }
                    role_approver_chatapprover: {
                        table: 'sys_user_has_role'
                        id: 'e7f8561b8c4d4ad29e5e7082b6014d6e'
                    }
                    role_approver_chatuser: {
                        table: 'sys_user_has_role'
                        id: '2479d905f9f143fd9ddd95524c73f3d7'
                    }
                    role_delegate_approveruser: {
                        table: 'sys_user_has_role'
                        id: '9d51ed4b4fa342e4a05b473f2372179e'
                    }
                    role_delegate_chatuser: {
                        table: 'sys_user_has_role'
                        id: '750868c205bf4ee6b3bdf40dfd1577af'
                    }
                    role_requester_chatuser: {
                        table: 'sys_user_has_role'
                        id: 'abfd34d4aeb4400e95a308625f9b02a2'
                    }
                    si_chatdemo_runner: {
                        table: 'sys_script_include'
                        id: 'b5029da32b0440fb9e40f6ea2e46d7e2'
                    }
                    si_chatdemo_setup: {
                        table: 'sys_script_include'
                        id: 'ddcfb22640c2454498ea1d0923fbcd1b'
                    }
                    trg_acq_created: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '3527964c754c4335bcddfdbe4832d907'
                    }
                    trg_chatdemo_setup: {
                        table: 'sys_trigger'
                        id: 'e58bfce1b01145adb769c8e26e6068df'
                    }
                    trg_hcx_created: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: 'a08dc99a65174af8998837fdf211d0bf'
                    }
                    usr_chatdemo_approver: {
                        table: 'sys_user'
                        id: '8bb796b6cf7549119500d6e448d25b10'
                    }
                    usr_chatdemo_delegate: {
                        table: 'sys_user'
                        id: 'c99a945fd3ec4705a73711286566dd35'
                    }
                    usr_chatdemo_requester: {
                        table: 'sys_user'
                        id: '7a8a9f690f874c4b8d17eae1f06c2904'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '016da04dedc941319bc14fd134dc1676'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'proposed_fee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '019b607b78534d17906d3383b92993da'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'cv_received'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '0f7826bcee4d4ae8a72f259b805d0680'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '1089f5fad99e4fc398650c31565834e2'
                        key: {
                            role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                            contains: {
                                id: '5fdde5354f83450cbd0095c17987c66f'
                                key: {
                                    name: 'x_kpm95_chatdemo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '10b33e5807cc49e1917670cb9612ce8d'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            value: 'neurology'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '12b4f315e2b9455e8737d3dff5f7059b'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '15db245b0ce74267a65a356fdeb85176'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'supplier'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '16d25a0cb60f4d26bed51befb9751622'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'budget_residual'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1a5c2263e3bd4438812810ec024d9209'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            value: 'oncology'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a8986192de54b98ae5608b899aa2180'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'justification'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '212f265cddde45ca97d949135ffa9ba9'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                            value: 'not_started'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22b4b636ba1a4e3bb5d139a384d5783e'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'supplier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '23334ae03d4940de850f6bf20fe152e0'
                        key: {
                            sys_security_acl: '8045c95386d641a4babd5cb9fd5a2c62'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '26c24f67b455400e9c0a3ac1f67ddac1'
                        key: {
                            role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                            contains: {
                                id: '58dd25ca916244f3853d74760013543b'
                                key: {
                                    name: 'x_kpm95_chatdemo.approver'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '287999ae2bab498aa63ae2007750c458'
                        key: {
                            sys_security_acl: 'd76eb48cf60246bca93da3ce565135ff'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b5ca6c991aa48e69fe69d58a1832555'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bc347ab1203458c8ee221cd08eadb11'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d943aa3b75f4d3d8371d42c61457235'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'budget_residual'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36ba1e634a514a8fbcadfb90201c1056'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            value: 'consulting'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '40f2f34f4e7b4c20a5b17f6388c8163e'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '41a0e09cf0294192a62fa08980af25a1'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '476c92fff9fb4348aa07dae9261e55f0'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'proposed_fee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c8761515d16454d8bdeeb6f8c32de98'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4e35a4c149c64705abf1d1892819add8'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '58dd25ca916244f3853d74760013543b'
                        key: {
                            name: 'x_kpm95_chatdemo.approver'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '5e0003a3acd441f38fe73b3c92629ef2'
                        key: {
                            category: 'x_kpm95_chatdemo_purchase_req'
                            prefix: 'ACQ'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '5fdde5354f83450cbd0095c17987c66f'
                        key: {
                            name: 'x_kpm95_chatdemo.user'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '60f1d280ef9d45238635161bacc65398'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            value: 'cardiology'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6300f4e762c24f77bc4b2a8a219bc53a'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            value: 'software'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6395e6400b684221acc72ebef854995f'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            value: 'marketing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '74562fe0b5734668bdb26c20597cde95'
                        key: {
                            sys_security_acl: '80a5791315024c0e99a5e4c8d98eb79c'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7634defb0e11423a9c25251aa35f0691'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                            value: 'speaker'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7773c654703749c98a6ce5d84f516d3f'
                        key: {
                            sys_security_acl: '8a1d5c3c63a943faa413cbe301f95916'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '783dae5568804707887d8f3b69ed32a8'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7a2597092a504f4ea8925bf5566bcfa3'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            value: 'hardware'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7b7e9469ddad43749cc5c1b56f09cab5'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e75cc9ba67244c989931379c03bb32d'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8add1e7bcfab49958c733009995ff9f2'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'justification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e391553a5834d85aeddfd8adbe84cdc'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                            value: 'passed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90061a2517f44d9a98a2cb23c07a19b8'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '93831cfe0f8f4ed097ef97e0e9dfdbde'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96089b5c6315442094cbcb993460594d'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9649b52109c242e989f89bacc3227292'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '97f11491a01d4b8f8ec72e811816f857'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c7fff15bdb34d63aa30a6a41db32980'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                            value: 'advisory_board'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acdaae2cd378472188c76c177fa6ae9f'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'cv_received'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af7e7d70c7df4c9cbf0a17ffd028f630'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b13f326271c6497299d7ec806ec73d20'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'fmv_max'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b1c3dd57d0e24136aad0f4cb03bf7dc5'
                        key: {
                            sys_security_acl: 'f7250a78a40242dd821ee551a8c75b6c'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                        key: {
                            name: 'x_kpm95_chatdemo.admin'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b72783b63408444a8d8129cd08f6cfcb'
                        key: {
                            sys_security_acl: '7ca2e63c1c7f45499b488740592db42b'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ba804e4179d0492996d99a902a07a319'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                            value: 'facilities'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bde04a0bc2fa47c5a7d3ddaa09e9f48a'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bffdbf23cc2844abb85ea8bcc091f1b5'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'quote_attached'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c22cc25102bb42d4bc232d2b5af6cdab'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c46c61dc54b64cd0a6e4459aab78faec'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            value: 'general'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c53515aa6a10494da7e84dff2ae7823b'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'hcp_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cae20eae23c84107b928d25e6bcb379d'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb73ff23a66442e3ae646cbbbf23612f'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'fmv_max'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce9bbe4b620d41a78380b4b4681f51ce'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                            value: 'endocrinology'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd00500febb664214a06e285826144795'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'contract_signed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd4a527c30ba348088f87bd55f2aadd24'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd5bcbbd9668f4b9cabf9d2a31b04ea6b'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'specialty'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9002bd38c9c4585af64dc74d2f827ca'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'hcp_name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd91033dd05ff47c5bb7142b3b15dd36f'
                        key: {
                            sys_security_acl: '525933acdf4d4e52916cb5761dbdca42'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e0d82e05a1fa46c2af03cb6f1767404a'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'contract_signed'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e2b2e6bd8af940b3954d5fe694cc1b10'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e60605397da5413aac7a13e6d92f21cc'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea5c75e6ef9c4ca58b362a41b8c2459e'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'eb544b0884ff49e2936ba1351e42b326'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ecd45b90c2a84204a1c324da4aa1f69d'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                            value: 'congress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f3591ef1577f4774ab4d6bb4cead901f'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3fe67518162404aa4bf4262c7a05328'
                        key: {
                            name: 'x_kpm95_chatdemo_purchase_req'
                            element: 'quote_attached'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f64d9f49102a48718b5f17da3bfd80af'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'compliance_check'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f676f10864c3483fa48af5924452024f'
                        key: {
                            category: 'x_kpm95_chatdemo_hcp_engage'
                            prefix: 'HCX'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb347f65ec874279b46845f586f0420e'
                        key: {
                            name: 'x_kpm95_chatdemo_hcp_engage'
                            element: 'event_type'
                            value: 'consultancy'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ffbee1599f59437bac4112d02f2ca1f8'
                        key: {
                            sys_security_acl: 'a833bf8091d749958bb4d29f7053dc2d'
                            sys_user_role: {
                                id: 'b20c1e4a8da64eaeb99a1ceff80e696c'
                                key: {
                                    name: 'x_kpm95_chatdemo.admin'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
