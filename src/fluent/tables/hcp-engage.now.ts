import {
    Table,
    StringColumn,
    ChoiceColumn,
    DecimalColumn,
    DateColumn,
    BooleanColumn,
} from '@servicenow/sdk/core'

// Engagement HCx della demo. Stesse scelte della tabella acquisti:
// estende task (correlation_id per il tag CHATDEMO) e non genera ACL automatiche.
export const x_kpm95_chatdemo_hcp_engage = Table({
    name: 'x_kpm95_chatdemo_hcp_engage',
    label: 'Engagement HCx',
    extends: 'task',
    createAccessControls: false,
    autoNumber: { prefix: 'HCX', number: 1000, numberOfDigits: 7 },
    schema: {
        hcp_name: StringColumn({ label: 'Nome HCP', maxLength: 100 }),
        specialty: ChoiceColumn({
            label: 'Specializzazione',
            dropdown: 'dropdown_with_none',
            choices: {
                cardiology: 'Cardiologia',
                oncology: 'Oncologia',
                neurology: 'Neurologia',
                endocrinology: 'Endocrinologia',
                general: 'Medicina generale',
            },
        }),
        event_type: ChoiceColumn({
            label: 'Tipo di evento',
            dropdown: 'dropdown_with_none',
            choices: {
                advisory_board: 'Advisory board',
                speaker: 'Speaker engagement',
                consultancy: 'Consulenza',
                congress: 'Partecipazione a congresso',
            },
        }),
        event_date: DateColumn({ label: 'Data evento' }),
        proposed_fee: DecimalColumn({ label: 'Compenso proposto (EUR)' }),
        fmv_max: DecimalColumn({ label: 'Fair market value massimo (EUR)' }),
        cv_received: BooleanColumn({ label: 'CV ricevuto', default: false }),
        contract_signed: BooleanColumn({ label: 'Contratto firmato', default: false }),
        compliance_check: ChoiceColumn({
            label: 'Verifica compliance',
            dropdown: 'dropdown_with_none',
            choices: {
                not_started: 'Non avviata',
                in_progress: 'In corso',
                passed: 'Superata',
                failed: 'Non superata',
            },
        }),
    },
})
