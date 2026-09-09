import { Record } from '@servicenow/sdk/core'

// Places the onboarding widget in the existing "sp" portal Homepage,
// main content column (sp_column f5fdf113877331102037866e0ebb35ee).
// sp_widget references the "Onboarding Form (Claude Code)" widget
// (src/fluent/widgets/onboarding-form) via its generated sys_id --
// see src/fluent/generated/keys.ts, key "claudecode-onboarding-widget".
Record({
    $id: Now.ID['claudecode-onboarding-homepage-instance'],
    table: 'sp_instance',
    data: {
        sp_column: 'f5fdf113877331102037866e0ebb35ee',
        sp_widget: 'c468ae81264642c188e1c24bd10fecc4',
        title: 'Onboarding',
        order: 3,
        active: true,
    },
})
