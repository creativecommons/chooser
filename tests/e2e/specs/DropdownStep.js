module.exports = {
    '@tags': ['ds'],
    'DropdownStep'(browser) {
        browser
            .init()
            .assert.elementPresent('.control-label > span')
            .click('.control-label > span')
            .assert.not.cssClassPresent('.pagination-next', 'disabled')
            .click('.pagination-next')
            .assert.elementPresent('.select > select')
            .click('.select > select')
            .click('option[value="CC0 1.0"]')
            .assert.not.cssClassPresent('.pagination-next', 'disabled')
            .click('.pagination-next')
            .assert.visible('.step-description')
            .assert.containsText('div.step-description', 'CC0 1.0 Universal')
            .end()
    }
}
