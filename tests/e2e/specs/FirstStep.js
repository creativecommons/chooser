module.exports = {
    '@tags': ['first'],
    'FirstStep'(browser) {
        const radioSelector = 'div.field.not-selected > label > span.control-label > span'
        const radioSelected = 'div.field.selected > label > span.control-label > span'
        const nextBtn = '.pagination-next'
        const stepTitle = 'div.step-header > h5'
        const stepBelowCurrentHeader = 'div:nth-child(2) > div > h5'

        browser
            .init()
            .click(radioSelector)
            .assert.containsText(stepBelowCurrentHeader, 'Creative Commons License')
            .click(radioSelector)
            .assert.containsText(stepBelowCurrentHeader, 'Attribution')
            .end()
    }
}
