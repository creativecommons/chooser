/**
 * Page object for license chooser
 */

const stepperCommands = {
  clickYes: function() {
    this.click('.radio-input[value="yes"]')
    this.pause(500)
    return this
  },
  clickNo: function() {
    this.click('.radio-input[value="no"]')
    this.pause(500)
    return this
  },
  clickNext: function() {
    this.click('.next-button')
    this.pause(500)
    return this
  },
  clickPrevious: function() {
    this.click('.previous-button')
    this.pause(500)
    return this
  },
  chooseNo: function() {
    this.clickNo()
      .clickNext()
    return this
  },
  chooseYes: function() {
    this.clickYes()
      .clickNext()
    return this
  },
  clickWaiver: function() {
    this.click('.v-checkbox:first-child input[type="checkbox"]')
      .click('.v-checkbox:last-child input[type="checkbox"]')
    this.clickNext()
    return this
  },
  selectFromDropdown: function(licenseName) {
    this
      .waitForElementVisible('.license-dropdown')
      .click('.license-dropdown')
      .click(`.license-dropdown option[value="${licenseName}"]`)
      .click('.next-button')
    this.pause(500)
    return this
  },
  assertStepName: function(stepName) {
    this.expect.element('@currentStep').to.have.property('classList').contain(stepName)
    return this
  },
}
const chooserCommands = {
  assertSelectedLicenseDisplayed: function(licenseName) {
    this
      .assert.containsText('.license-short-name', licenseName)
    return this
  },
}
module.exports = {
  url: '/',
  commands: [chooserCommands],

  elements: {
    appContainer: '#app',
    stepper: '.stepper__container',
    selectedLicenseCard: '.recommended-card',
    licenseUseCard: '.license-use-card',
  },

  sections: {
    stepper: {
      selector: '.stepper__container',
      elements: {
        currentStep: {
          selector: '.step-container.active',
        },
      },
      commands: [stepperCommands],
    },
    selectedLicenseCard: {
      selector: '.recommended-card',
    },
    licenseUseCard: {
      selector: '.license-use-card',
    },
  },

}
