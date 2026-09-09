import { Table, StringColumn, EmailColumn, DateColumn } from '@servicenow/sdk/core'

// Stores submissions from the Onboarding Form widget (created by Claude Code)
export const x_kpm95_claudecode_onboarding = Table({
    name: 'x_kpm95_claudecode_onboarding',
    label: 'Onboarding Request',
    display: 'email',
    schema: {
        first_name: StringColumn({ label: 'First name', maxLength: 100, mandatory: true }),
        last_name: StringColumn({ label: 'Last name', maxLength: 100, mandatory: true }),
        email: EmailColumn({ label: 'Email', mandatory: true }),
        department: StringColumn({ label: 'Department', maxLength: 100 }),
        start_date: DateColumn({ label: 'Start date' }),
    },
    accessibleFrom: 'public',
    actions: { create: true, read: true, update: false, delete: false },
})
