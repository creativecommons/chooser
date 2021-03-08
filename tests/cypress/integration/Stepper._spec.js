/* This Source Code Form is subject to the terms of the Creative Commons
 * License Chooser
*/

describe('Stepper.vue', () => {
  it('Clicking the info button', () => {
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
    cy.missingModal()
    cy.clickInfo()
    cy.openModal()
    cy.clickClose()
    cy.missingModal()
  })
  describe('User can select licenses using the dropdown', () => {
    it('Selecting CC0', () => {
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

    it('Selecting CC BY-NC-ND', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC BY-NC-ND 4.0')
      cy.hasRecommendedLicense('CC BY-NC-ND 4.0')
      cy.hasStepsCount(3)
      cy.clickNext()
      cy.hasLicenseInAttributionCode('CC BY-NC-ND 4.0')
    })
  })

  describe('User can select a license using the steps', () => {
    it('Selecting CC0', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()


      cy.makeAChoice('.BY', 'no')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.hasStepsCount(8)
      cy.clickNext()
      cy.get('.NC').should('have.class', 'disabled')
      cy.get('.ND').should('have.class', 'disabled')
      cy.get('.SA').should('have.class', 'disabled')
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
    })

    it('Selecting CC BY', () => {
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
    })

    it('Selecting CC BY-NC-ND', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()

      cy.makeAChoice('.BY', 'yes')
      cy.hasRecommendedLicense('CC BY 4.0')
      cy.clickNext()
      cy.makeAChoice('.NC', 'no')
      cy.hasRecommendedLicense('CC BY-NC 4.0')
      cy.clickNext()
      cy.makeAChoice('.ND', 'no')
      cy.hasRecommendedLicense('CC BY-NC-ND 4.0')
      cy.clickNext()
      cy.get('.SA').should('have.class', 'disabled')
      cy.hasLicenseInAttributionCode('CC BY-NC-ND 4.0')
    })

    it('Can select CC BY-ND', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()

      cy.makeAChoice('.BY', 'yes')
      cy.hasRecommendedLicense('CC BY 4.0')
      cy.clickNext()
      cy.makeAChoice('.NC', 'yes')
      cy.clickNext()
      cy.makeAChoice('.ND', 'no')
      cy.hasRecommendedLicense('CC BY-ND 4.0')
      cy.clickNext()
      cy.get('.SA').should('have.class', 'disabled')
      cy.hasLicenseInAttributionCode('CC BY-ND 4.0')
    })
  })

  describe('"Back", "Done" and "Start again" buttons work correctly', () => {
    it('User can select CC BY-ND, go back and change selection to CC BY-SA', () => {
      cy.clickBack()
      cy.makeAChoice('.ND', 'yes')
      cy.clickNext()
      cy.makeAChoice('.SA', 'yes') // @todo Fix this bug, must click yes before no to get it to switch
      cy.makeAChoice('.SA', 'no')
      cy.clickNext()
      cy.hasRecommendedLicense('CC BY-SA 4.0')
      cy.get('.AD').should('be.visible')
      cy.hasLicenseInAttributionCode('CC BY-SA 4.0')
    })

    it('User can select CCO using the License Dropdown, go back and select CC BY-NC-SA using steps', () => {
      cy.visit('/')
      cy.makeAChoice('.FS', 'yes')
      cy.clickNext()
      cy.get('select').select('CC0 1.0')
      cy.hasRecommendedLicense('CC0 1.0 Universal')
      cy.clickNext()
      cy.waiveCopyright()
      cy.clickNext()
      cy.hasLicenseInAttributionCode(' CC0 1.0 ')
      cy.clickBack()
      cy.clickBack()
      cy.clickBack()
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()


      cy.makeAChoice('.BY', 'yes')
      cy.hasRecommendedLicense('CC BY 4.0')
      cy.clickNext()
      cy.makeAChoice('.NC', 'yes')
      cy.clickNext()
      cy.makeAChoice('.ND', 'yes')
      cy.clickNext()
      cy.makeAChoice('.SA', 'no')
      cy.hasRecommendedLicense('CC BY-SA 4.0')
      cy.clickNext()
      cy.hasLicenseInAttributionCode('CC BY-SA 4.0')
    })

    it('User can start the selection process over by clicking "Start again" Button', () => {
      cy.get('button').contains('Start again').click()
      cy.get('.right-column').find('.recommended-card').should('not.exist')
      cy.get('.right-column').find('.license-use-card').should('not.exist')
      cy.get('.BY').should('have.class', 'inactive')
      cy.get('.NC').should('have.class', 'inactive')
      cy.get('.ND').should('have.class', 'inactive')
      cy.get('.SA').should('have.class', 'inactive')
    })

    it('Chooser auto-scrolls to "Mark Your Work" section when "Done" is clicked', () => {
      cy.visit('/')
      cy.viewport('iphone-x')
      cy.makeAChoice('.FS', 'no')
      cy.clickNext()

      // Appropriate license step
      cy.get('.AL [type="checkbox"]').each($el => cy.wrap($el).check())
      cy.clickNext()


      cy.makeAChoice('.BY', 'yes')
      cy.clickNext()
      cy.makeAChoice('.NC', 'yes')
      cy.clickNext()
      cy.makeAChoice('.ND', 'no')
      cy.clickNext()
      cy.get('.SA').should('have.class', 'disabled')
      cy.hasRecommendedLicense('CC BY-ND 4.0')
      cy.window().then(($window) => {
        expect($window.scrollY).to.be.closeTo(800, 500)
      })
      cy.get('button').contains('DONE').click()
      cy.hasLicenseInAttributionCode('CC BY-ND 4.0')
      cy.window().then(($window) => {
        expect($window.scrollY).to.be.closeTo(1400, 500)
      })
    })
  })
})
