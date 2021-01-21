/* This Source Code Form is subject to the terms of the Creative Commons
 * License Chooser
*/

// test the interpolated library

Cypress.Commands.add('clickNext', () => {
    cy.get('.next-button').click()
})

Cypress.Commands.add('copyrightWaiverStep', () => {
    cy.get('.v-checkbox:nth-child(1) > input').check()
    cy.get('.v-checkbox:nth-child(2) > input').check()
})
describe('Stepper.vue', () => {
    it('renders correctly', () => {
        cy.visit('/')
    })
    describe('Checks the user know the license needed', () => {
        let countNumberOfSteps = 0
        it('Checks whether the CC0 license is selected in the dropdown', () => {
        cy.get('.FS')
            .find('[value="yes"]')
            .check()
            .then(() => {
                countNumberOfSteps+=1
            })
            cy.clickNext();
        cy.get('select').select('CC0 1.0')
        cy.get('.recommended-card').should('be.visible').contains('CC0 1.0 Universal')
        cy.get('.next-button')
        .click()
        .then(() => {
            countNumberOfSteps+=1
        })
        cy.copyrightWaiverStep()
        cy.get('.next-button')
        .click()
        .then(() => {
            countNumberOfSteps+=1
        })
        cy.get('.AD').should('be.visible')
        cy.get('.next-button')
        .click()
        .then(() => {
            countNumberOfSteps+=1
            expect(countNumberOfSteps).to.equal(4)
        })
        cy.get('.license-use-card').should('be.visible').contains(' CC0 1.0 ')
        })

        it('Checks whether CC BY-NC-ND is selected in the dropdown', () => {
            let countNumberOfSteps = 0
            cy.visit('/')
            cy.get('.FS')
            .find('[value="yes"]')
            .check()
            .then(() => {
                countNumberOfSteps+=1
            })
            cy.clickNext();
            cy.get('select').select('CC BY-NC-ND 4.0')
            cy.get('.recommended-card').should('be.visible').contains('CC BY-NC-ND 4.0')
            cy.get('.next-button')
            .click()
            .then(() => {
                countNumberOfSteps+=1
            })
            cy.get('.AD').should('be.visible')
            cy.get('.next-button')
            .click()
            .then(() => {
                countNumberOfSteps+=1
                expect(countNumberOfSteps).to.equal(3)
            })
            cy.get('.license-use-card').should('be.visible').contains('CC BY-NC-ND 4.0')
        })
    })

    describe('Checks the user needed help to choose the license', () => {
        it('Checks whether CCO License appears after choosing "NO" attribution', () => {
            cy.visit('/')
            cy.get('.FS')
            .find('[value="no"]')
            .check()
            cy.clickNext();
            cy.get('.BY')
            .find('[value="no"]')
            .check()
            cy.get('.recommended-card').should('be.visible').contains('CC0 1.0 Universal')
            cy.clickNext();
            cy.get('.NC').should('have.class','disabled')
            cy.get('.ND').should('have.class','disabled')
            cy.get('.SA').should('have.class','disabled')
            cy.copyrightWaiverStep()
            cy.get('.next-button')
            .click()
            cy.get('.AD').should('be.visible')
            cy.get('.next-button')
            .click()
            cy.get('.license-use-card').should('be.visible').contains(' CC0 1.0 ')
        })

        it('Checks whether CC BY License appears after choosing "YES" attribution', () => {
            cy.visit('/')
            cy.get('.FS')
            .find('[value="no"]')
            .check()
            cy.clickNext();
            cy.get('.BY')
            .find('[value="yes"]')
            .check()
            cy.get('.recommended-card').should('be.visible').contains('CC BY 4.0')
            cy.clickNext();
            cy.get('.NC')
            .find('[value="yes"]')
            .check()
            cy.clickNext();
            cy.get('.ND')
            .find('[value="yes"]')
            .check()
            cy.clickNext();
            cy.get('.SA')
            .find('[value="yes"]')
            .check()
            cy.clickNext();
            cy.get('.AD').should('be.visible')
            cy.get('.next-button')
            .click()
            cy.get('.license-use-card').should('be.visible').contains('CC BY 4.0')
        })

        it('Checks whether CC BY-NC-ND License appears after choosing "YES" attribution', () => {
            cy.visit('/')
            cy.get('.FS')
            .find('[value="no"]')
            .check()
            cy.clickNext();
            cy.get('.BY')
            .find('[value="yes"]')
            .check()
            cy.get('.recommended-card').should('be.visible').contains('CC BY 4.0')
            cy.clickNext();
            cy.get('.NC')
            .find('[value="no"]')
            .check()
            cy.get('.recommended-card').should('be.visible').contains('CC BY-NC 4.0')
            cy.clickNext();
            cy.get('.ND')
            .find('[value="no"]')
            .check()
            cy.get('.recommended-card').should('be.visible').contains('CC BY-NC-ND 4.0')
            cy.clickNext();
            cy.get('.SA').should('have.class','disabled')
            cy.clickNext();
            cy.get('.AD').should('be.visible')
            cy.get('.next-button')
            .click()
            cy.get('.license-use-card').should('be.visible').contains('CC BY-NC-ND 4.0')
        })

        it('Checks whether CC BY-ND License appears after choosing "YES" attribution', () => {
            cy.visit('/')
            cy.get('.FS')
            .find('[value="no"]')
            .check()
            cy.clickNext();
            cy.get('.BY')
            .find('[value="yes"]')
            .check()
            cy.clickNext();
            cy.get('.NC')
            .find('[value="yes"]')
            .check()
            cy.clickNext();
            cy.get('.ND')
            .find('[value="no"]')
            .check()
            cy.clickNext();
            cy.get('.SA').should('have.class','disabled')
            cy.get('.recommended-card').should('be.visible').contains('CC BY-ND 4.0')
            cy.get('.AD').should('be.visible')
            cy.get('.next-button')
            .click()
            cy.get('.license-use-card').should('be.visible').contains('CC BY-ND 4.0')
        })

        describe('Checks whether Back Button is working or not', () => {

            it('Checks whether a user can convert CC BY-ND License into CC BY-SA', () => {
                cy.get('.previous-button').click()
                cy.get('.ND')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('.SA')
                .find('[value="no"]')
                .check()
                cy.clickNext();
                cy.get('.recommended-card').should('be.visible').contains('CC BY-SA 4.0')
                cy.get('.AD').should('be.visible')
                cy.get('.next-button')
                .click()
                cy.get('.license-use-card').should('be.visible').contains('CC BY-SA 4.0')
            })

            it('Checks whether a user can convert CCO using the License Dropdown into CC BY-NC-SA with the answer to the first question as "NO" ', () => {
                cy.visit('/')
                cy.get('.FS')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('select').select('CC0 1.0')
                cy.get('.recommended-card').should('be.visible').contains('CC0 1.0 Universal')
                cy.clickNext();
                cy.copyrightWaiverStep()
                cy.clickNext();
                cy.get('.license-use-card').should('be.visible').contains(' CC0 1.0 ')
                cy.get('.previous-button').click()
                cy.get('.previous-button').click()
                cy.get('.previous-button').click()
                cy.get('.FS')
                .find('[value="no"]')
                .check()
                cy.clickNext();
                cy.get('.BY')
                .find('[value="yes"]')
                .check()
                cy.get('.recommended-card').should('be.visible').contains('CC BY 4.0')
                cy.clickNext();
                cy.get('.NC')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('.ND')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('.SA')
                .find('[value="no"]')
                .check()
                cy.get('.recommended-card').should('be.visible').contains('CC BY-SA 4.0')
                cy.clickNext();
                cy.get('.license-use-card').should('be.visible').contains('CC BY-SA 4.0')
            })
        })

        describe('Checks whether the user can click on Start Again Button and the application gets a hot reload', () => {
            it('Clicks on Start Again Buttton', () => {
                cy.get('.restart-button').click()
                cy.get('.right-column').find('.recommended-card').should('not.exist')
                cy.get('.right-column').find('.license-use-card').should('not.exist')
                cy.get('.BY').should('have.class','inactive')
                cy.get('.NC').should('have.class','inactive')
                cy.get('.ND').should('have.class','inactive')
                cy.get('.SA').should('have.class','inactive')

            })
        })

        describe('Checks that the application gets an auto-scroll to "Mark Your Work Section" when clicked on Done', () => {
            it('Choose a License of your choice ', () => {
                cy.viewport('iphone-x')
                cy.get('.FS')
                .find('[value="no"]')
                .check()
                cy.clickNext();
                cy.get('.BY')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('.NC')
                .find('[value="yes"]')
                .check()
                cy.clickNext();
                cy.get('.ND')
                .find('[value="no"]')
                .check()
                cy.clickNext();
                cy.get('.SA').should('have.class','disabled')
                cy.get('.recommended-card').should('be.visible').contains('CC BY-ND 4.0')
                cy.get('.license-use-card').should('be.visible').contains('CC BY-ND 4.0')
                cy.clickNext();
                cy.scrollTo("bottom")
            })
        })
    })
})
