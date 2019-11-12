const clipboardy = require('clipboardy')

module.exports = {
    'Copybutton.vue - testing the #copy-richtext-btn flow': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#copy-richtext-btn')
            .assert.elementPresent('#attribution-richtext')
            .click('#copy-richtext-btn')
            .assert.containsText('#copy-richtext-btn', 'Copied!')
            .getText('#attribution-richtext', function(result) {
                this.assert.equal(result.value, clipboardy.readSync().trim())
            })
            .expect.element('#copy-richtext-btn').text.to.equal('Copy Rich Text').after(3000)
    },

    'Copybutton.vue - testing the #copy-html-btn flow': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#copy-html-btn')
            .assert.elementPresent('#attribution-html')
            .click('#copy-html-btn')
            .assert.containsText('#copy-html-btn', 'Copied!')
            .getValue('#attribution-html', function(result) {
                this.assert.equal(result.value, clipboardy.readSync().trim())
            })
            .expect.element('#copy-html-btn').text.to.equal('Copy HTML').after(3000)
    }
}
