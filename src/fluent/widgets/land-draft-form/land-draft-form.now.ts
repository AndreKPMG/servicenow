import { SPWidget } from '@servicenow/sdk/core'

// Submission form for renewable energy land acquisition project drafts.
export const landDraftFormWidget = SPWidget({
    $id: Now.ID['x_kpm95_claudecode_land_draft_form'],
    id: 'x_kpm95_claudecode_land_draft_form',
    name: 'Land Acquisition Draft Form',
    description:
        'Form to submit a new draft project for the acquisition of land for renewable energy generation.',
    category: 'custom',
    hasPreview: true,
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    htmlTemplate: Now.include('./template.html'),
    customCss: Now.include('./styles.scss'),
})
