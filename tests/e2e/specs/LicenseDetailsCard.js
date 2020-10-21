module.exports = {

    'Check if the main div tag with the class selected-license-card is present': function(browser) {
        browser
            .init()
            .assert.elementPresent('.control-label > span')
            .click('.control-label > span')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('.select')
            .click('.select')
            .click('option[value="CC BY-SA 4.0"]')
            .assert.elementPresent('.selected-license-card')
    },
    'Check if the a tag with class license-name redirects correctly': function(browser) {
        browser
            .assert.elementPresent('a[class="license-name"]')
            .getAttribute('a[class="license-name"]', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1')
            })
    }
}
