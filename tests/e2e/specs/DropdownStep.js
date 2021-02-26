module.exports = {
  '@tags': ['ds'],
  'DropdownStep'(browser) {
    browser
      .init()
      .assert.elementPresent('.v-radio')
      .click('.v-radio')
      .click('.next-button')
      .assert.elementPresent('.select > select')
      .click('.select > select')
      .click('option[value="CC BY 4.0"]')
      .assert.attributeEquals('.next-button', 'disabled', null, 'Next Button enabled after user selects license from dropdown ')
      .click('.next-button')
      .assert.visible('.DD .step-header__caption')
      .assert.containsText('.DD .step-header__caption', 'Attribution 4.0 International')
      .end()
  },
}
