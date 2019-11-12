module.exports = {
    'The section with information about the license has a title "Selected License  "': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.title')
            .assert.containsText('h2', 'Selected License')
            .assert.elementPresent('.help')
            .end()
    },

    'The license information about the CC BY 4.0 is shown by default when a user goes to the home page': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.selected-license-name')
            .assert.containsText('.help', 'Atribution 4.0 International')
            .assert.containsText('#chooser-selected-share_adapt', 'CC BY attribution means you allow people to')
            .assert.elementPresent('#chooser-selected-description')
            .assert.containsText('#chooser-selected-description', 'As the most accommodating of licenses offered, the CC BY license allows others to distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation.')
            .end()
    },

    'click the chooser icon': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .click('.sa')
            .pause(1000)
            .assert.containsText('.selected-license-name', 'CC BY-SA 4.0')
    },

    'if the selected license is CC BY-SA 4.0, the license information is shown as expected': function(browser) {
        browser
            .assert.containsText('#chooser-selected-description', 'The CC BY-SA license is realtively accommodating. Similar to the CC BY license, BY-SA allows others to distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation, and share the derivative work under the same license.')
            .end()
    },

    'click icon to select license': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .click('.nd')
            .pause(1000)
            .assert.containsText('.selected-license-name', 'CC BY-ND 4.0')
    },

    'if the selected license is CC BY-ND 4.0, the license information is shown as expected': function(browser) {
        browser
            .assert.containsText('#chooser-selected-description', 'The CC BY-ND license begins to become less accommodating. BY-ND stipulates that people are free to distribute your work, even commercially, and must credit you with the original creation, but they are not allowed to remix, tweak, or build upon your work.')
            .end()
    }

}
