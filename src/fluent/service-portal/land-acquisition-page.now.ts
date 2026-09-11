import { SPPage } from '@servicenow/sdk/core'
import { landHeroWidget } from '../widgets/land-hero/land-hero.now'
import { landDraftFormWidget } from '../widgets/land-draft-form/land-draft-form.now'
import { landDraftListWidget } from '../widgets/land-draft-list/land-draft-list.now'

// Land acquisition page for the "sp" Service Portal: green/white hero band,
// draft submission form and the current user's own drafts.
export const landAcquisitionPage = SPPage({
    pageId: 'x_kpm95_claudecode_land_acquisition',
    title: 'Land Acquisition',
    category: 'custom',
    public: false,
    draft: false,
    shortDescription: 'Submit and track draft projects for renewable energy land acquisition.',
    dynamicTitleStructure: 'Land Acquisition - ${portal.title}',
    css: `
        .rn-page-band {
            padding: 28px 0 40px;
            background-color: #f6faf8;
        }
        .rn-page-band .container {
            padding-left: 0;
            padding-right: 0;
        }
    `,
    containers: [
        {
            $id: Now.ID['x_kpm95_claudecode_land_container_hero'],
            name: 'Land Acquisition - Hero',
            width: 'container',
            parentClass: 'rn-page-band',
            semanticTag: 'main',
            order: 100,
            rows: [
                {
                    $id: Now.ID['x_kpm95_claudecode_land_row_hero'],
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['x_kpm95_claudecode_land_col_hero'],
                            size: 12,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_kpm95_claudecode_land_instance_hero'],
                                    id: 'x_kpm95_claudecode_land_instance_hero',
                                    widget: landHeroWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    $id: Now.ID['x_kpm95_claudecode_land_row_main'],
                    order: 200,
                    columns: [
                        {
                            $id: Now.ID['x_kpm95_claudecode_land_col_form'],
                            size: 8,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_kpm95_claudecode_land_instance_form'],
                                    id: 'x_kpm95_claudecode_land_instance_form',
                                    widget: landDraftFormWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                        {
                            $id: Now.ID['x_kpm95_claudecode_land_col_list'],
                            size: 4,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 200,
                            instances: [
                                {
                                    $id: Now.ID['x_kpm95_claudecode_land_instance_list'],
                                    id: 'x_kpm95_claudecode_land_instance_list',
                                    widget: landDraftListWidget,
                                    order: 100,
                                    active: true,
                                    widgetParameters: '{"max_records":8}',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})
