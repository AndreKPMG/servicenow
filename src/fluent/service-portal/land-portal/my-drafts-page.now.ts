import { SPPage } from '@servicenow/sdk/core'
import { landDraftListWidget } from '../../widgets/land-draft-list/land-draft-list.now'

// Full-width listing of the current user's own land acquisition drafts.
export const landMyDraftsPage = SPPage({
    pageId: 'x_kpm95_claudecode_land_my_drafts',
    title: 'My drafts',
    category: 'custom',
    public: false,
    draft: false,
    shortDescription: 'Land acquisition drafts submitted by the current user.',
    dynamicTitleStructure: 'My drafts - ${portal.title}',
    css: `
        .rn-page-band {
            padding: 28px 0 44px;
            background-color: #f1f8f4;
        }
    `,
    containers: [
        {
            $id: Now.ID['x_kpm95_claudecode_land_drafts_container'],
            name: 'My Drafts - Main',
            width: 'container',
            parentClass: 'rn-page-band',
            semanticTag: 'main',
            order: 100,
            rows: [
                {
                    $id: Now.ID['x_kpm95_claudecode_land_drafts_row'],
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['x_kpm95_claudecode_land_drafts_col'],
                            size: 12,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_kpm95_claudecode_land_drafts_instance'],
                                    id: 'x_kpm95_claudecode_land_drafts_instance',
                                    widget: landDraftListWidget,
                                    order: 100,
                                    active: true,
                                    widgetParameters: '{"max_records":30}',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})
