// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support/commands.js" />

/* This Source Code Form is subject to the terms of the Creative Commons
 * License Chooser
*/

describe('Attribution Details Step.vue', () => {
  describe('Mark Your Work section appears and is hidden at the correct moments', () => {
    it('The "Mark Your Work" section should be invisible at the beginning', () => {
      cy.visit('/')
      cy.missingLicenseInAttributionCode()
    })

    it('It should appear when the user selects a license from the dropdown and clicks Next', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
    })

    it('It should disappear when the user clicks Back.', () => {
      cy.clickBack()
      cy.missingLicenseInAttributionCode()
    })

    it('When the user clicks back again, and then uses the steps (i.e. clicking I need help on the first step) to choose the license, the "Mark Your Work" section should appear again when the last step is selected.', () => {
      cy.clickBack()
      cy.clickBack()
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
    })
  })

  describe('Mark Your Work section correctly shows the license in the correct format:', () => {
    it('When the user selects "CC BY", the license is shown correctly in all tabs', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()

      cy.makeAChoice('.BY', 'yes')
      cy.hasRecommendedLicense('CC BY 4.0')
      cy.hasStepsCount(7)
      cy.clickNext()
      cy.makeAChoice('.NC', 'yes')
      cy.clickNext()
      cy.makeAChoice('.ND', 'yes')
      cy.clickNext()
      cy.makeAChoice('.SA', 'yes')
      cy.get('.AD').should('be.visible')
      cy.clickNext()
      cy.hasLicenseInAttributionCode('CC BY 4.0')
      cy.headerTitle('CC BY 4.0')
      cy.readableStringTitle('BY')
      cy.licenseText(' CC BY 4.0')
    })

    it('When the user changes attribution type, the license changes from Short to Full, accordingly', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()

      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
      cy.toggleButton()
      cy.licenseText(' CC0 1.0 Universal')
    })
  })

  describe('The license code can be copied to the clipboard', () => {
    it('When the user clicks on "Copy", the button text changes to "Copied", and the clipboard contains the license text.', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
      cy.copyButton('Copy')
      cy.copyButton('Copied')
    })
  })

  describe('Year Of Creation Input field available or not', () => {
    it('not visible if the license is not CC-BY type', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.missingInputField(5)
    })
    it('visible if the license is of type CC-BY', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC BY 4.0')
      cy.hasRecommendedLicense('Attribution 4.0 International')
      cy.hasStepsCount(3)
      cy.clickNext()
      cy.visibleInputField(5)
    })
  })

  describe('Attribution details are updated correctly', () => {
    it('When the user adds information in the attribution details, the license code is updated accordingly', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(4)
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.selectInputField(1, 'foo')
      cy.selectInputField(2, 'bar')
      cy.selectInputField(3, 'https://creativecommons.org ')
      cy.selectInputField(4, 'https://creativecommons.org ')
      cy.valueOfInputField(1, '[property="dct:title"]')
      cy.valueOfInputField(2, '[property="cc:attributionName"]')
    })
    it('When the user adds information in the attribution details, the year of Creation field is updated accordingly', () => {
      cy.clickBack()
      cy.clickBack()
      cy.get('select').select('CC BY 4.0')
      cy.hasRecommendedLicense('Attribution 4.0 International')
      cy.hasStepsCount(3)
      cy.clickNext()
      cy.selectInputField(5, '2021')
      cy.valueOfInputField(5, '.license-text > :nth-child(2)')
    })
  })
})
