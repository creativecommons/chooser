module.exports = {
    'Check if the Help Section is rendered in the DOM': function(browser) {
        browser
            .init()
            .assert.elementPresent('.help-section')
            .assert.elementPresent('.h3a')
    },

    'Check if "What Are Creative Commons Licenses?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(1) > a')
            .click('ul > li:nth-child(1) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.help-text')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('#license_link')
            .getAttribute('#license_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/licenses/')
            })
    },

    'Check if "How do the Licenses Work?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(2) > a')
            .click('ul > li:nth-child(2) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.help-text')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('#cc_rights_link')
            .getAttribute('#cc_rights_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://wiki.creativecommons.org/Ccrel')
            })
            .assert.elementPresent('#license_link_2')
            .getAttribute('#license_link_2', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/licenses/')
            })
    },
    'Check if "What do the Icons Mean?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(3) > a')
            .click('ul > li:nth-child(3) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.modal-card-body')
            .assert.elementPresent('.edu-icons-title-section img')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('.help a')
            .getAttribute('.help a', 'href', function(result) {
                this.assert.equal(result.value, 'https://wiki.creativecommons.org/wiki/NonCommercial_interpretation')
            })
            .assert.elementPresent('#domain_link')
            .getAttribute('#domain_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/publicdomain/')
            })
    },

    'Check if "Considerations Before Licensing" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(4) > a')
            .click('ul > li:nth-child(4) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('#licensors_link')
            .getAttribute('#licensors_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensors')
            })
            .assert.elementPresent('#licensees_link')
            .getAttribute('#licensees_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensees')
            })
            .assert.elementPresent('#wiki_link')
            .getAttribute('#wiki_link', 'href', function(result) {
                this.assert.equal(result.value, 'https://wiki.creativecommons.org/wiki/Before_Licensing')
            })
    },

    'Check if "How do I Formally License my Work?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(5) > a')
            .click('ul > li:nth-child(5) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.modal-card-body')
            .assert.elementPresent('article')
    },

    'Check if "The Six Creative Commons Licenses" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(6) > a')
            .click('ul > li:nth-child(6) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.modal-card-body')
            .assert.elementPresent('div[class="column"] img')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('.modal-card-foot p a')
            .getAttribute('.modal-card-foot p a', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/share-your-work/licensing-types-examples/')
            })
    },

    'Check if "How are Licenses Communicated?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(7) > a')
            .click('ul > li:nth-child(7) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.modal-card-body')
            .assert.elementPresent('.help-section__table')
            .assert.elementPresent('.photo-license-icons img')
    },

    'Check if "What is a Free Culture License?" modal is working fine': function(browser) {
        browser
            .init()
            .assert.elementPresent('ul > li:nth-child(8) > a')
            .click('ul > li:nth-child(8) > a')
            .assert.elementPresent('.modal-content')
            .assert.elementPresent('header[class="modal-card-head"]')
            .assert.elementPresent('.modal-card-body')
            .assert.elementPresent('footer[class="modal-card-foot"]')
            .assert.elementPresent('p[class="help-text"] a')
            .getAttribute('p[class="help-text"] a', 'href', function(result) {
                this.assert.equal(result.value, 'https://freedomdefined.org/Definition')
            })
            .assert.elementPresent('footer[class="modal-card-foot"] p a')
            .getAttribute('footer[class="modal-card-foot"] p a', 'href', function(result) {
                this.assert.equal(result.value, 'https://creativecommons.org/share-your-work/public-domain/freeworks')
            })
    }
}
