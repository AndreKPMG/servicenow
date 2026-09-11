import { SPWidget } from '@servicenow/sdk/core'

// Lists the land acquisition drafts submitted by the current user.
export const landDraftListWidget = SPWidget({
    $id: Now.ID['x_kpm95_claudecode_land_draft_list'],
    id: 'x_kpm95_claudecode_land_draft_list',
    name: 'My Land Acquisition Drafts',
    description: 'Lists the land acquisition project drafts submitted by the logged in user.',
    category: 'custom',
    hasPreview: true,
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    htmlTemplate: Now.include('./template.html'),
    customCss: Now.include('./styles.scss'),
    optionSchema: [
        {
            name: 'max_records',
            label: 'Max Records',
            type: 'integer',
            section: 'Data',
            defaultValue: 8,
        },
    ],
})
