module.exports = {

    'Check if the main div tag with the class license-use-card is present': function(browser) {
        browser
            .init()
            .assert.elementPresent('.control-label > span')
            .click('.control-label > span')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('.select')
            .click('.select')
            .click('option[value="CC BY 4.0"]')
            .assert.elementPresent('.pagination-next')
            .click('.pagination-next')
            .assert.elementPresent('.license-use-card')
    },
    'Check if the elements are present inside the main div': function(browser) {
        browser
            .assert.elementPresent('.license-use-card h4')
            .assert.elementPresent('nav[class="tabs"]')
            .assert.elementPresent('.tab-content')
            .assert.elementPresent('.license-use-instructions')
            .expect.element('.license-use-instructions').text.to.equal('Choose what kind of work you are licensing to get appropriate license code.')
    },
    'Check if the tab items are present in the DOM': function(browser) {
        browser
            .assert.elementPresent('.tab-item')
            .assert.elementPresent('.tab-content > div:nth-child(1)')
            .assert.elementPresent('.tab-content > div:nth-child(2)')
    }
}
