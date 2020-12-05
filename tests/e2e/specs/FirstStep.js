module.exports = {
    '@tags': ['first'],
    'FirstStep'(browser) {
        const radioSelector = 'div.field.not-selected > label > span.control-label > span'
        const nextBtn = '.next-button'
        const stepBelowCurrentHeader = 'div:nth-child(2) > div > h5'
        const stepDescription = '.step-description'
        const backBtn = '.previous-button'

        browser
            .init()
            .waitForElementVisible('body')
            .assert.not.elementPresent(stepDescription)
            .click(radioSelector)
            .assert.containsText(stepBelowCurrentHeader, 'Creative Commons License')
            .click(nextBtn)
            .assert.elementPresent(stepDescription)
            .assert.visible(stepDescription)
            .assert.containsText(stepDescription, 'I know which license I need.')
            .click(backBtn)
            .click(radioSelector)
            .assert.containsText(stepBelowCurrentHeader, 'Attribution')
            .click(nextBtn)
            .assert.containsText(stepDescription, 'I need help selecting a license.')
            .end()
    }
}
