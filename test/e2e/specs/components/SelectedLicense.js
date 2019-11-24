module.exports = {
    'SelectedLicense.vue - testing the #SelectedLicense contents': function(browser) {
        browser
            .url(browser.globals.devServerURL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#SelectedLicense')
            .assert.elementPresent('.title is-2')
            .assert.containsText('.title is-2', 'Selected License')
            .expect.element('.license-icons').to.be.present.after(1000)
            .end()
    }
}
