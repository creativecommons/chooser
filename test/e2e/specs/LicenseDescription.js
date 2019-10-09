module.exports = {
    'The section with information about the license has a title "Selected License  "': function (browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.title')
            .assert.containsText('h2', 'Selected License')
            .assert.elementPresent('.help')
            .end()
    }
}
