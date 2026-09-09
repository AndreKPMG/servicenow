import { Record } from '@servicenow/sdk/core'

// Places the onboarding widget on the REAL "sp" portal Homepage (sp_page id
// "index", sys_id 46cc384147532100ba13a5554ee49009 -- the page id "homepage"
// belongs to an unrelated legacy page, not the live sp portal's home page).
//
// Adds a new full-width row/column at the bottom of "Service Portal -
// Container 4" (the page's main content container, sys_id
// e3698ad6cb20020000f8d856634c9c42) rather than reusing an existing
// row/column, so none of the existing layout is disturbed.
//
// sp_widget references the "Onboarding Form (Claude Code)" widget
// (src/fluent/widgets/onboarding-form) via its generated sys_id --
// see src/fluent/generated/keys.ts, key "claudecode-onboarding-widget".

export const onboardingHomepageRow = Record({
    $id: Now.ID['claudecode-onboarding-homepage-row'],
    table: 'sp_row',
    data: {
        sp_container: 'e3698ad6cb20020000f8d856634c9c42',
        order: 3,
    },
})

export const onboardingHomepageColumn = Record({
    $id: Now.ID['claudecode-onboarding-homepage-column'],
    table: 'sp_column',
    data: {
        sp_row: onboardingHomepageRow,
        size: 12,
        order: 1,
    },
})

Record({
    $id: Now.ID['claudecode-onboarding-homepage-instance'],
    table: 'sp_instance',
    data: {
        sp_column: onboardingHomepageColumn,
        sp_widget: 'c468ae81264642c188e1c24bd10fecc4',
        title: 'Onboarding',
        order: 1,
        active: true,
    },
})
