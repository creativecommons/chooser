module.exports = {

    'Check if the p-tag with the class license-text is present': function(browser) {
        browser
            .init()
            .assert.elementPresent('.control-label > span')
            .click('.control-label > span')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('.select > select')
            .click('.select')
            .click('option[value="CC BY-SA 4.0"]')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('p[class="license-text"]')
    },
    'Check if the links in the license code redirects properly': function(browser) {
        browser
            .setValue('input[placeholder="Jane Doe"]', 'Jane Doe')
            .setValue('input[placeholder="www.author.com"]', 'www.author.com')
            .setValue('input[placeholder="This work"]', 'This work')
            .setValue('input[placeholder="www.author.com/work.jpg"]', 'www.author.com/work.jpg')
            .assert.elementPresent('p[class="license-text"] a')
            .getAttribute('p > span > a:nth-child(1)', 'href', function(result) {
                this.assert.equal(result.value, 'http://www.author.com/work.jpg')
            })
            .getAttribute('p > span > a:nth-child(2)', 'href', function(result) {
                const urlString = result.value.split('/').slice(3).join('/')
                this.assert.equal(urlString, 'www.author.com')
            })
            .getAttribute('p > span > a:nth-child(4)', 'href', function(result) {
                const urlString = result.value.split('/').slice(3).join('/')
                this.assert.equal(urlString, 'licenses/by-sa/4.0/?ref=chooser-v1')
            })
    },
    'Check if the text is displayed under the print attribution': function(browser) {
        browser
            .click('nav > ul > li:nth-child(2) > a')
            .assert.elementPresent('p[class="license-text"]')
            .assert.elementPresent('#attribution-text > p > span:nth-child(1)')
            .assert.elementPresent('#attribution-text > p > span:nth-child(2)')
    },

    // Tests for the text under the "Plain Text"

    'Check if the work in plain text is displayed': function(browser) {
        browser
            .click('nav > ul > li:nth-child(2) > a')
            .expect.element('#attribution-text > p > span:nth-child(1) > span:nth-child(1)').text.to.equal('This work')
    },
    'Check if the license in plain text is displayed': function(browser) {
        browser
            .expect.element('#attribution-text > p > span:nth-child(1) > span:nth-child(4)').text.to.equal('CC BY-SA 4.0')
    },
    'Check if the author-name in plain text is displayed': function(browser) {
        browser
            .expect.element('#attribution-text > p > span:nth-child(1) > span:nth-child(2) > span').text.to.equal('Jane Doe')
    },
    'Check if the license-details in plain text are displayed': function(browser) {
        browser
            .click('nav > ul > li:nth-child(2) > a')
            .assert.elementPresent('#attribution-text > p > span:nth-child(2)')
            .expect.element('#attribution-text > p > span:nth-child(2)').text.to.equal('. To view a copy of this license, visit https://creativecommons.org/licenses/by-sa/4.0')
    }
}
