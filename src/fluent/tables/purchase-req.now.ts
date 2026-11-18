import {
    Table,
    StringColumn,
    MultiLineTextColumn,
    ChoiceColumn,
    DecimalColumn,
    BooleanColumn,
} from '@servicenow/sdk/core'

// Richieste di acquisto della demo. Estende task: eredita number, state,
// short_description, assignment_group, approval e correlation_id, che e' il
// campo usato come tag CHATDEMO dal reset() della Fase 3.
// createAccessControls: false -> nessuna ACL generata in automatico, valgono
// solo quelle definite in src/fluent/security (admin, opened_by, approvatore,
// delegato attivo).
export const x_kpm95_chatdemo_purchase_req = Table({
    name: 'x_kpm95_chatdemo_purchase_req',
    label: 'Richiesta di acquisto',
    extends: 'task',
    createAccessControls: false,
    autoNumber: { prefix: 'ACQ', number: 1000, numberOfDigits: 7 },
    schema: {
        supplier: StringColumn({ label: 'Fornitore', maxLength: 100 }),
        category: ChoiceColumn({
            label: 'Categoria',
            dropdown: 'dropdown_with_none',
            choices: {
                hardware: 'Hardware',
                software: 'Software',
                consulting: 'Consulenza',
                facilities: 'Facilities',
                marketing: 'Marketing',
            },
        }),
        amount: DecimalColumn({ label: 'Importo (EUR)' }),
        cost_center: StringColumn({ label: 'Centro di costo', maxLength: 60 }),
        budget_residual: DecimalColumn({ label: 'Budget residuo (EUR)' }),
        justification: MultiLineTextColumn({ label: 'Motivazione' }),
        quote_attached: BooleanColumn({ label: 'Preventivo allegato', default: false }),
    },
})
