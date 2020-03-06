module.exports = {

    'Check if the main p tag with the class license-text is present': function(browser) {
        browser
            .init()
            .assert.elementPresent('.control-label > span')
            .click('.control-label > span')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('.select > select')
            .click('.select > select')
            .click('option[value="CC BY-SA 4.0"]')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('p[class="license-text"]')
    },
    'Check if the a tag in the "Rich Text" redirects to https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser': function(browser) {
        browser
            .assert.elementPresent('p[class="license-text"] a')
            .getAttribute('p[class="license-text"] a', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser')
            })
    }
}