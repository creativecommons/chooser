module.exports = {
    'The section with information about the license has a title "Selected License  "': function (browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.title')
            .assert.containsText('h2', 'Selected License')
            .assert.elementPresent('.help')
            .end()
    },

    'The license information about the CC BY 4.0 is shown by default when a user goes to the home page': function (browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.selected-license-name')
            .assert.containsText('.help', 'Atribution 4.0 International')
            .assert.containsText('#chooser-selected-share_adapt', 'CC BY attribution means you allow people to')
            .assert.elementPresent('#chooser-selected-description')
            .assert.containsText('#chooser-selected-description', 'As the most accommodating of licenses offered, the CC BY license allows others to distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation.')
            .end()
    }



}
