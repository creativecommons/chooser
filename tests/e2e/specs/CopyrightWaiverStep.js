module.exports = {
    '@tags': ['cws'],
    'Check if CopyrightWaiver is rendered correctly'(browser) {
        browser
            .init()
            .click('.control-label')
            .click('.v-radio')
            .click('.next-button')
            .click('.select > select')
            .click('option[value="CC0 1.0"]')
            .click('.next-button')
            .assert.elementPresent('.v-checkbox:nth-child(1)')
            .assert.elementPresent('.v-checkbox:nth-child(3)')
    },

    'Check if user can check and uncheck checkboxes'(browser) {
        browser
            .assert.attributeEquals('.next-button', 'disabled', 'true', 'Next Button disabled when checkboxes not checked')
            .click('.v-checkbox:nth-child(1)')
            .click('.v-checkbox:nth-child(3)')
            .assert.attributeEquals('.next-button', 'disabled', null, 'Next Button enabled when user checks agreed and confirmed')
            .click('.v-checkbox:nth-child(1)')
            .assert.attributeEquals('.next-button', 'disabled', 'true', 'Next button disabled when user unchecks agreed')
            .click('.v-checkbox:nth-child(1)')
            .assert.attributeEquals('.next-button', 'disabled', null, 'Next Button enabled when user re-checks agreed')
            .click('.v-checkbox:nth-child(3)')
            .assert.attributeEquals('.next-button', 'disabled', 'true', 'Next button disabled when user unchecks confirmed')
    }
}
