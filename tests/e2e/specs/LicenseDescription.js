module.exports = {
    'The section with information about the license has a title "Selected License  "': function(browser) {
        browser
            .init()
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.title')
            .assert.containsText('h2', 'Selected License')
            .assert.elementPresent('.help')
            .end()
    },

    'The license information about the CC BY 4.0 is shown by default when a user goes to the home page': function(browser) {
        browser
            .init()
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.selected-license-name')
            .assert.containsText('.help', 'Attribution 4.0 International')
            .assert.containsText('#chooser-selected-share_adapt', 'CC BY means you allow people to')
            .assert.elementPresent('#chooser-selected-description')
            .assert.containsText('#chooser-selected-description', 'The CC BY license allows others to distribute, ' +
            'remix, adapt, and build upon your work, even commercially, as long as they credit you.')
            .end()
    },

    'click the chooser icon': function(browser) {
        browser
            .init()
            .waitForElementVisible('#app', 5000)
            .click('.sa')
            .pause(1000)
            .assert.containsText('.selected-license-name', 'CC BY-SA 4.0')
    },

    'if the selected license is CC BY-SA 4.0, the license information is shown as expected': function(browser) {
        browser
            .assert.containsText('#chooser-selected-description', 'Similar to the CC BY license, BY-SA allows others' +
            ' to distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you for ' +
            'the original creation, and share the derivative work under the same license.')
            .end()
    },

    'click icon to select license': function(browser) {
        browser
            .init()
            .waitForElementVisible('#app', 5000)
            .click('.nd')
            .pause(1000)
            .assert.containsText('.selected-license-name', 'CC BY-ND 4.0')
    },

    'if the selected license is CC BY-ND 4.0, the license information is shown as expected': function(browser) {
        browser
            .assert.containsText('#chooser-selected-description', 'BY-ND stipulates that people are free to ' +
            'distribute your work, even commercially, and must credit you, but they are not allowed to share ' +
            'any adaptations they make based on your work.')
            .end()
    }

}
