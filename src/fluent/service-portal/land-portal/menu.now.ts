import { SPMenu } from '@servicenow/sdk/core'
import { landAcquisitionPage } from '../land-acquisition-page.now'
import { landMyDraftsPage } from './my-drafts-page.now'

export const landMenu = SPMenu({
    $id: Now.ID['x_kpm95_claudecode_land_menu'],
    title: 'Land Acquisition Menu',
    widget: '5ef595c1cb12020000f8d856634c9c6e', // OOTB Header Menu widget
    items: [
        {
            $id: Now.ID['x_kpm95_claudecode_land_menu_home'],
            type: 'page',
            label: 'Overview',
            page: landAcquisitionPage,
            glyph: 'home',
            order: 100,
            active: true,
        },
        {
            $id: Now.ID['x_kpm95_claudecode_land_menu_drafts'],
            type: 'page',
            label: 'My drafts',
            page: landMyDraftsPage,
            glyph: 'file-text-o',
            order: 200,
            active: true,
        },
    ],
})
