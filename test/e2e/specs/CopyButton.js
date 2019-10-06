const clipboardy = require('clipboardy');

module.exports = {
    'Copybutton.vue - testing the #copy-richtext-btn flow': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#copy-richtext-btn')
            .assert.elementPresent('#attribution-richtext')
            .click('#copy-richtext-btn')
            .assert.containsText("#copy-richtext-btn", "Copied!")
            .getText('#attribution-richtext', function (result) {
                this.assert.equal(result.value, clipboardy.readSync().trim());
            })
            .expect.element("#copy-richtext-btn").text.to.equal("Copy Rich Text").after(2050);
    }
}


