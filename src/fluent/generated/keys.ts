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
            }
        }
    }
}
