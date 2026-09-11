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
                    x_kpm95_claudecode_land_col_form: {
                        table: 'sp_column'
                        id: '8d65dbbaa6f540b3ae1949531dda2761'
                    }
                    x_kpm95_claudecode_land_col_hero: {
                        table: 'sp_column'
                        id: '2c72414a55d1413d9ac8f802b2edd4ce'
                    }
                    x_kpm95_claudecode_land_col_list: {
                        table: 'sp_column'
                        id: '4882cce59bbd471394c6641b56d21f3a'
                    }
                    x_kpm95_claudecode_land_container_hero: {
                        table: 'sp_container'
                        id: '406a174086b24e63a0f3ebe2e742e0c2'
                    }
                    x_kpm95_claudecode_land_draft_form: {
                        table: 'sp_widget'
                        id: '03db10bd9eeb411a870a204de25c6eac'
                    }
                    x_kpm95_claudecode_land_draft_list: {
                        table: 'sp_widget'
                        id: '3e811516446f4c19b84ac98e56387ad5'
                    }
                    x_kpm95_claudecode_land_hero: {
                        table: 'sp_widget'
                        id: 'b849da2d86604fee89cbd1715a0d4142'
                    }
                    x_kpm95_claudecode_land_instance_form: {
                        table: 'sp_instance'
                        id: 'b17acd52e5fa4347b55058a44e511d0e'
                    }
                    x_kpm95_claudecode_land_instance_hero: {
                        table: 'sp_instance'
                        id: 'f0aa74533b3b4147b0b2d77702bbb308'
                    }
                    x_kpm95_claudecode_land_instance_list: {
                        table: 'sp_instance'
                        id: 'be53a1f770e2428194ca25c159bc41f9'
                    }
                    x_kpm95_claudecode_land_row_hero: {
                        table: 'sp_row'
                        id: '1b52c6c4066f4551843343d47f7e05ee'
                    }
                    x_kpm95_claudecode_land_row_main: {
                        table: 'sp_row'
                        id: 'e0891e005ae141f590134e3d5207513c'
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
                        table: 'sys_choice'
                        id: '08d7835cb34a4697847c25cf85b43926'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ab53bbba72a4f9885c5d95aaeed4556'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0badf6e6c70c47f8a1860509b23cebbb'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'wind_offshore'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0c22825269aa4a78b361b3cd9196628a'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '160935a61ab848e6ad0cfbbee84409e4'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1985c3f0ae0d4efdafa077ed85246dc0'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'biomass'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1fb06d5a481e40bc98919fadef8d56aa'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'landowner_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '22910508191c4221be4f481e4860fa0f'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'geothermal'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '22d8e4dcae184784a3cbe7eae3e545cd'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '274c14fa53da4ba5aa6a9cb6d0e13ea6'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'target_acquisition_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '297b5c92fc2041aabec2388a26472030'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'NULL'
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
                        table: 'sys_documentation'
                        id: '2db6332263f24acda7b924049c3f2c69'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2db8d75a0d4b42bd91cf748d702c0340'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'area_hectares'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '30b7846f9f5e44a8a506ac163baf50a7'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'country'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '318d8a3346a644939aa15ee4050f2be5'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'landowner_name'
                            language: 'en'
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
                        table: 'sys_choice'
                        id: '3430c7061e364225866e764dd7717e3f'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            value: 'in_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34e5012e5eac43478fe9345a68a31fda'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '35f690c31c384a1a98705ab8f126ba93'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'wind_onshore'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: '3780c67632d14355a1722e68c9cf40cd'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'cadastral_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42afc0326431465d843dfa81e7301936'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'municipality'
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
                        table: 'sys_choice'
                        id: '4641783b7d8c49f0947127e4287f8137'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '468cc90286df4f6f9484a550f25ccd4d'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'country'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5dbf9d7b83b34ddca26c744d570121e4'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e0e5e8ae3674563b68be2284dd2558b'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'target_acquisition_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e613210e0a649c19e8bbf153787f264'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'grid_distance_km'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71731ea5b377445b9c736c4e4ca2098a'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'landowner_name'
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
                        id: '729daff0e97f4a5d8508b593cbe96ba1'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'estimated_capacity_mw'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '77e0e8aa21ef4771adc3f025d9ba7082'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'municipality'
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
                        table: 'sys_dictionary'
                        id: '8df3c97992af42ca83c7f27cc8bc3556'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
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
                        table: 'sys_choice'
                        id: '928fc90e136543549b2513dd41271964'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'hydro'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '955674207da54a2f83b378f784db07f0'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'area_hectares'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9fe20449ae154eedb496c99c726ad15c'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1d37a8d730d4ccda729642c31a46d73'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a475fa20485e4d0fabd3ba3a785333cd'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
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
                        table: 'sys_choice_set'
                        id: 'aa97e0a22cc4427e9e666a740eb47ba6'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac2e0ffbc8024c7cabb49d10de591cec'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'project_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b32d7d090df740349b3a8e7d6bc91dc5'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'submitted_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6861b0f392e40a183fa7666345ebd5c'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7d1681e34d246a788d86ee5a2489a13'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            language: 'en'
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
                        id: 'bd171a41030b402db3752266ceeb424e'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'estimated_budget'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf314cd8a7574610ab829c699794ace9'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'estimated_capacity_mw'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: 'd317ab6bb60843b082f4725029d1e885'
                        key: {
                            id: 'x_kpm95_claudecode_land_acquisition'
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
                        id: 'de9794cbe2584c64916912526c099ac9'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'landowner_email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3088baf245f4e93bac9502e2ad50e04'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'project_name'
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
                        table: 'sys_choice'
                        id: 'e936890a2b694df9b6bbc63cd6f80258'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'storage'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9fea4b8416d49cb9236ce1206b2d1de'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'cadastral_reference'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed9f4630afff4b6a8d48bf9c767e371a'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'estimated_budget'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eda95d108fdc4e5296bbe289f7b4e019'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'state'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eef06aaa3d0a41ccab36f5a3185ff2be'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'submitted_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0001c4c04e84a888cf2d8469065005d'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'grid_distance_km'
                            language: 'en'
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
                    {
                        table: 'sys_choice'
                        id: 'fdbe497f8e5e4a90ad6e699aa655bdaf'
                        key: {
                            name: 'x_kpm95_claudecode_land_draft'
                            element: 'energy_type'
                            value: 'solar'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                ]
            }
        }
    }
}
