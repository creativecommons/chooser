module.exports = {
    'Step one: open License Chooser page': function(browser) {
        const chooser = browser.page.chooser().navigate()
        chooser.expect.section('@stepper').to.be.visible
        chooser.expect.section('@selectedLicenseCard').to.not.be.present
        chooser.expect.section('@licenseUseCard').to.not.be.present
    },
    'Step two: selecting "I need help" opens license attribute steps and selected license card': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper.expect.element('@currentStep').to.be.present
        stepper.chooseNo().clickNo()
        chooser.waitForElementVisible('@selectedLicenseCard')
        chooser.expect.section('@selectedLicenseCard').to.be.visible
    },
    'Step three: going through license attribute steps opens license use card and Attribution Details Step': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseYes()
            .chooseYes()
            .chooseYes()
        chooser.waitForElementVisible('@licenseUseCard')
        chooser.expect.section('@licenseUseCard').to.be.visible
    },
    'Can choose CC0 1.0 license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseNo()
            .clickWaiver()
        chooser.assertSelectedLicenseDisplayed('CC0 1.0')
    },
    'Can choose CC BY license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseYes()
            .chooseYes()
        chooser.assertSelectedLicenseDisplayed('CC BY 4.0')
    },
    'Can choose CC BY-NC license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseNo()
            .chooseYes()
            .chooseYes()
        chooser.assertSelectedLicenseDisplayed('CC BY-NC 4.0')
    },
    'Can choose CC BY-ND license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseYes()
            .chooseNo()

        chooser.assertSelectedLicenseDisplayed('CC BY-ND 4.0')
    },
    'Can choose CC BY-NC-ND license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseNo()
            .chooseNo()
        chooser.assertSelectedLicenseDisplayed('CC BY-NC-ND 4.0')
    },
    'Can choose CC BY-SA license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseYes()
            .chooseYes()
            .chooseNo()
        chooser.assertSelectedLicenseDisplayed('CC BY-SA 4.0')
    },
    'Can choose CC BY-NC-SA license': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseNo()
            .chooseYes()
            .chooseNo()
        chooser.assertSelectedLicenseDisplayed('CC BY-NC-SA 4.0')
    },
    'Can select a license from dropdown': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseYes()
            .selectFromDropdown('CC BY-NC-ND 4.0')
        chooser.assertSelectedLicenseDisplayed('CC BY-NC-ND 4.0')
    },
    'Can go back by clicking on Previous button': function(browser) {
        const chooser = browser.page.chooser().navigate()
        const stepper = chooser.section.stepper
        stepper
            .chooseNo()
            .chooseYes()
            .chooseNo()
            .chooseYes()
            .chooseNo()
        chooser.assertSelectedLicenseDisplayed('CC BY-NC-SA 4.0')
        stepper.clickPrevious()
        chooser.assert.elementNotPresent('@licenseUseCard')
        stepper.assertStepName('SA')
            .clickPrevious()
            .assertStepName('ND')
            .clickPrevious()
            .assertStepName('NC')
            .clickPrevious()
            .assertStepName('BY')
            .clickPrevious()
            .assertStepName('FS')
        chooser.assert.elementPresent('@selectedLicenseCard')
    }
}
