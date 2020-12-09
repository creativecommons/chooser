module.exports = {
    '@tags': ['att'],
    'AttributionDetailsStep'(browser) {
        const knowLicenseSelector = '.v-radio'
        const nextButton = '.next-button'
        const stepTitle = '.step-header__title'
        const workAuthorLabel = '.step-content > div > form > div:nth-child(1) > label'
        const workAuthorInput = 'form > div:nth-child(1) input'
        const urlCreatorProfileLabel = 'form > div:nth-child(2) > label'
        const urlCreatorProfileInput = 'form > div:nth-child(2) input'
        const workUrlLabel = 'form > div:nth-child(3)  label'
        const workUrlInput = 'form > div:nth-child(4) input'
        const workTitleLabel = 'form > div:nth-child(3)  label'
        const workTitleInput = 'form > div:nth-child(3)  input'
        const backBtn = '.previous-button'
        const doneBtn = '.done-button'
        const restartBtn = '.restart-button'

        browser
            .init()
            .click(knowLicenseSelector)
            .click(nextButton)
            .click('.select > select')
            .click('option[value="CC BY 4.0"]')
            .click(nextButton)
            .assert.visible(stepTitle, 'Title is visible')
            .assert.visible(workAuthorLabel, 'Work Author Label is visible')
            .assert.visible(workAuthorInput, 'Work Author Input is visible')
            .assert.visible(urlCreatorProfileLabel, 'URL of Creator Profile Label is visible')
            .assert.visible(urlCreatorProfileInput, 'URL of Creator Profile Input is visible')
            .assert.visible(workUrlLabel, 'Work URL Label is visible')
            .assert.visible(workUrlInput, 'Work URL Input is visible')
            .assert.visible(workTitleLabel, 'Work Title Label is visible')
            .assert.visible(workTitleInput, 'Work Title Input is visible')
            .assert.visible(backBtn, 'Back button is visible')
            .assert.visible(doneBtn, 'Done button is visible')
            .assert.visible(restartBtn, 'Start again button is visible')
    }
}
