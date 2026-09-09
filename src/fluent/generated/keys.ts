import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'b401f3224dc94ee3ab1c5f345ecf8e01'
                    }
                    br0: {
                        table: 'sys_script'
                        id: '334d5b377fed48b3829b40da163285c2'
                    }
                    'claudecode-onboarding-homepage-column': {
                        table: 'sp_column'
                        id: '7080586de0be41438cca7315e511376e'
                    }
                    'claudecode-onboarding-homepage-instance': {
                        table: 'sp_instance'
                        id: 'dfc2495884904ec18bb669e70c1364c4'
                    }
                    'claudecode-onboarding-homepage-row': {
                        table: 'sp_row'
                        id: '4f1f0356fa0040a8b203de5a04fce75f'
                    }
                    'claudecode-onboarding-widget': {
                        table: 'sp_widget'
                        id: 'c468ae81264642c188e1c24bd10fecc4'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: 'cf1ed3741a934ac6b9d97e9f35e2d1f9'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '47e1e2135e4147668154679f3ae2f693'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '7a3c214a320e4bc3b833e3836f05a248'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '0064bdc3b6d1445e91258aa4f89c7a8f'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '299f03434dca4aabb87df71ed4d23956'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2a088319bc59437583f9c79a8812564b'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'first_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32319fd557ca4b30afcd0297fe63d635'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36d4ef1b74064a40a0fa0c7e7cc71317'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4560f85587894acbb66994c7350df7c0'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '723542efccf041ab85ef48f192720313'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8a80e17dfbca43cbacbb6fe6b523424f'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8fb4acc2a9164dce95ce81bb52664fae'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a9478c5d5a7b43929bad7e5d32900acf'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b86de737bcb447229c5e98bd8145bb79'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de3231bde6994b48ab5bb65a0155d49e'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5bfe531747540be8c09e05cf67d6f22'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f0c32bdaffaf4c2fa334c8d6eab98129'
                        key: {
                            name: 'x_kpm95_claudecode_onboarding'
                            element: 'start_date'
                        }
                    },
                ]
            }
        }
    }
}
