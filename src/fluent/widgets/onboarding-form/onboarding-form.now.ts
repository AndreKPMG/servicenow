import { SPWidget } from '@servicenow/sdk/core'

// Service Portal widget with an onboarding form -- created by Claude Code
export const onboardingFormWidget = SPWidget({
    $id: Now.ID['claudecode-onboarding-widget'],
    name: 'Onboarding Form (Claude Code)',
    id: 'claudecode-onboarding-form',
    description: 'Form di onboarding per nuovi utenti. Creato da Claude Code.',
    category: 'custom',
    hasPreview: true,
    public: false,
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    htmlTemplate: Now.include('./template.html'),
    customCss: Now.include('./styles.scss'),
})
