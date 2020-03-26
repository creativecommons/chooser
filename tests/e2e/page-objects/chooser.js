/**
 * Page object for license chooser
 */

const stepperCommands = {
    clickYes: function() {
        this.click('.step-actions .field:first-of-type .check')
        return this
    },
    clickNo: function() {
        this.click('.step-actions .field:last-of-type .check')
        return this
    },
    clickNext: function() {
        this.click('.pagination-next')
        return this
    },
    clickPrevious: function() {
        this.click('.pagination-previous')
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
        this.click('.checkbox:first-of-type input[type=checkbox]')
            .click('.checkbox:last-of-type input[type=checkbox]')
            .click('.pagination-next')
        return this
    },
    selectFromDropdown: function(licenseName) {
        this
            .waitForElementVisible('.license-dropdown')
            .click('.license-dropdown')
            .click(`.license-dropdown option[value="${licenseName}"]`)
            .click('.pagination-next')
        return this
    },
    assertStepName: function(stepName) {
        this.expect.element('@currentStep').to.have.property('classList').contain(stepName)
        return this
    }
}
const chooserCommands = {
    assertSelectedLicenseDisplayed: function(licenseName) {
        this
            .assert.containsText('.license-name', licenseName)
            .assert.containsText('p.license-text a', licenseName)
        return this
    }
}
module.exports = {
    url: '/',
    commands: [chooserCommands],

    elements: {
        appContainer: '#app',
        stepper: '.stepper-container',
        selectedLicenseCard: '.selected-license-card',
        licenseUseCard: '.license-use-card'
    },

    sections: {
        stepper: {
            selector: '.stepper-container',
            elements: {
                currentStep: {
                    selector: '.step-container.current'
                }
            },
            commands: [stepperCommands]
        },
        selectedLicenseCard: {
            selector: '.selected-license-card'
        },
        licenseUseCard: {
            selector: '.license-use-card'
        }
    }

}
