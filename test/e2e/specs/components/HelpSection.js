module.exports = {
    'Common license pop up redirects to https://creativecommons.org/licenses/': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#cc_license_btn')
            .click('#cc_license_btn')
            .assert.elementPresent('#license_redirector')
            .click('#license_redirector')
            .assert.urlEquals('https://creativecommons.org/licenses/')
    },

    'How do licenses work pop up redirects to https://creativecommons.org/licenses/': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#license_work_btn')
            .click('#license_work_btn')
            .assert.elementPresent('#license_redirector_2')
            .click('#license_redirector_2')
            .assert.urlEquals('https://creativecommons.org/licenses/')
    },

    'How do licenses work pop up redirects to https://wiki.creativecommons.org/wiki/CC_REL': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#license_work_btn')
            .click('#license_work_btn')
            .assert.elementPresent('#cc_rights_redirector')
            .click('#cc_rights_redirector')
            .assert.urlEquals('https://wiki.creativecommons.org/wiki/CC_REL')
    },

    'Public domain pop up redirects to https://creativecommons.org/publicdomain/': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#public_domain_btn')
            .click('#public_domain_btn')
            .assert.elementPresent('#domain_redirector')
            .click('#domain_redirector')
            .assert.urlEquals('https://creativecommons.org/publicdomain/')
    },

    'License consideration pop up redirects to https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensors': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#consideration_btn')
            .click('#consideration_btn')
            .assert.elementPresent('#licensors_redirector')
            .click('#licensors_redirector')
            .assert.urlEquals('https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensors')
    },

    'License consideration pop up redirects to https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensees': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#consideration_btn')
            .click('#consideration_btn')
            .assert.elementPresent('#licensees_redirector')
            .click('#licensees_redirector')
            .assert.urlEquals('https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensees')
    },

    'License consideration pop up redirects to https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#consideration_btn')
            .click('#consideration_btn')
            .assert.elementPresent('#wiki_redirector')
            .click('#wiki_redirector')
            .assert.urlEquals('https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees')
    },

    'License types pop up redirects to https://creativecommons.org/share-your-work/licensing-types-examples/': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#license_description_btn')
            .click('#license_description_btn')
            .assert.elementPresent('#licensing_examples_redirector')
            .click('#licensing_examples_redirector')
            .assert.urlEquals('https://creativecommons.org/share-your-work/licensing-types-examples/')
    },
}