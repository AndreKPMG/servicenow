import { ServicePortal } from '@servicenow/sdk/core'
import { landAcquisitionPage } from '../land-acquisition-page.now'
import { landTheme } from './theme.now'
import { landMenu } from './menu.now'

// Standalone portal for the renewable energy land acquisition process,
// served at /land_acquisition.
export const landPortal = ServicePortal({
    $id: Now.ID['x_kpm95_claudecode_land_portal'],
    title: 'Land Acquisition',
    urlSuffix: 'land_acquisition',
    homePage: landAcquisitionPage,
    loginPage: '6995a144cb11120000f8d856634c9c25', // OOTB Login page
    notFoundPage: '3c2c9063cb11020000f8d856634c9c1f', // OOTB Not Found page
    theme: landTheme,
    mainMenu: landMenu,
    defaultPortal: false,
    enableFavorites: false,
    inactive: false,
    hidePortalName: false,
})
