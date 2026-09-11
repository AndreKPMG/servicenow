import { SPWidget } from '@servicenow/sdk/core'

// Green hero band for the Land Acquisition page, with live pipeline counters.
export const landHeroWidget = SPWidget({
    $id: Now.ID['x_kpm95_claudecode_land_hero'],
    id: 'x_kpm95_claudecode_land_hero',
    name: 'Land Acquisition Hero',
    description: 'Hero band with headline and live land acquisition pipeline counters.',
    category: 'custom',
    hasPreview: true,
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    htmlTemplate: Now.include('./template.html'),
    customCss: Now.include('./styles.scss'),
    optionSchema: [
        {
            name: 'eyebrow',
            label: 'Eyebrow text',
            type: 'string',
            section: 'Presentation',
            defaultValue: 'Renewable development pipeline',
        },
        {
            name: 'title',
            label: 'Title',
            type: 'string',
            section: 'Presentation',
            defaultValue: 'Land Acquisition',
        },
        {
            name: 'subtitle',
            label: 'Subtitle',
            type: 'string',
            section: 'Presentation',
            defaultValue:
                'Submit and track draft project proposals for the acquisition of land for renewable energy generation.',
        },
    ],
})
