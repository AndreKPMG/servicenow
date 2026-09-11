import { SPTheme } from '@servicenow/sdk/core'

// Green/white branding for the Land Acquisition portal.
// Raw hex is used deliberately instead of sp-rgb() UXF tokens: the tokens
// resolve to the instance's own palette, which would override the green brand.
export const landTheme = SPTheme({
    $id: Now.ID['x_kpm95_claudecode_land_theme'],
    name: 'Land Acquisition Theme',
    header: 'bf5ec2f2cb10120000f8d856634c9c0c', // OOTB Stock Header
    fixedHeader: true,
    logoAltText: 'Land Acquisition',
    turnOffScssCompilation: false,
    customCss: `
$brand-primary:   #17703f !default;
$body-bg:         #f1f8f4 !default;
$text-color:      #17251e !default;
$link-color:      #17703f !default;
$link-hover-color:#0e3b25 !default;

$navbar-inverse-bg:                        #0e3b25 !default;
$navbar-inverse-border:                    #0e3b25 !default;
$navbar-inverse-brand-color:               #ffffff !default;
$navbar-inverse-brand-hover-color:         #ffffff !default;
$navbar-inverse-link-color:                rgba(255,255,255,0.88) !default;
$navbar-inverse-link-hover-color:          #ffffff !default;
$navbar-inverse-link-hover-bg:             rgba(255,255,255,0.10) !default;
$navbar-inverse-link-active-color:         #ffffff !default;
$navbar-inverse-link-active-bg:            rgba(255,255,255,0.14) !default;
$navbar-inverse-toggle-icon-bar-bg:        #ffffff !default;
$navbar-inverse-toggle-border-color:       rgba(255,255,255,0.40) !default;
$navbar-inverse-toggle-hover-bg:           rgba(255,255,255,0.12) !default;

$navbar-default-bg:                        #0e3b25 !default;
$navbar-default-border:                    #0e3b25 !default;
$navbar-default-link-color:                rgba(255,255,255,0.88) !default;
$navbar-default-link-hover-color:          #ffffff !default;
$navbar-default-brand-color:               #ffffff !default;

$btn-primary-color:  #ffffff !default;
$btn-primary-bg:     #17703f !default;
$btn-primary-border: #17703f !default;
`,
})
