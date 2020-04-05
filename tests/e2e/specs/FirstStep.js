module.exports = {
    '@tags': ['first'],
    'FirstStep'(browser) {
        const radioSelector = 'div.field.not-selected > label > span.control-label > span'
        const radioSelected = 'div.field.selected > label > span.control-label > span'
        const nextBtn = '.pagination-next'
        const stepTitle = 'div.step-header > h5'

        browser
            .init()
            .assert.containsText(stepTitle, 'Do you know which license you need?')
            .assert.containsText(radioSelector, 'Yes. I know which license I need')
            .assert.containsText(radioSelected, 'No. I need help selecting a license')
            .click(radioSelector)
            .assert.not.cssClassPresent(nextBtn, 'disabled')
            .assert.containsText(radioSelector, 'No. I need help selecting a license')
            .end()
    }
}
