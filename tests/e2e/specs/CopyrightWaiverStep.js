module.exports = {
    '@tags': ['cws'],
    'Check if CopyrightWaiver is rendered correctly'(browser) {
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
            .assert.elementPresent('.control-label')
            .assert.elementPresent('.waiver-textarea')
            .assert.elementPresent('label:nth-child(1)')
            .assert.elementPresent('label:nth-child(3)')
    },

    'Check if user can check and uncheck checkboxes'(browser) {
        browser
            .click('label:nth-child(1)>span.control-label')
            .click('label:nth-child(3)>span.control-label')
            .assert.not.cssClassPresent('.pagination-next', 'disabled', 'Next Button visible when  user checks agreed and confirmed')
            .click('label:nth-child(1)>span.control-label')
            .assert.cssClassPresent('.pagination-next', 'disabled', 'Next button disabled when user unchecks agreed')
            .click('label:nth-child(1)>span.control-label')
            .assert.not.cssClassPresent('.pagination-next', 'disabled', 'Next Button visible when user re-checks agreed')
            .click('label:nth-child(3)>span.control-label')
            .assert.cssClassPresent('.pagination-next', 'disabled', 'Next button disabled when user unchecks confirmed')
    }
}
