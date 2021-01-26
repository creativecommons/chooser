// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clickNext', () => {
    cy.get('button').contains('NEXT').click()
})
Cypress.Commands.add('clickBack', () => {
    cy.get('button').contains('BACK').click()
})

Cypress.Commands.add('makeAChoice', (stepId, choice) => {
    cy.get(stepId).find(`[value="${choice}"]`).check()
})

Cypress.Commands.add('waiveCopyright', () => {
    cy.get('.v-checkbox:nth-child(1) > input').check()
    cy.get('.v-checkbox:nth-child(2) > input').check()
})

Cypress.Commands.add('hasRecommendedLicense', (license) => {
    cy.get('.recommended-card').should('be.visible').contains(license)
})

Cypress.Commands.add('hasLicenseInAttributionCode', (license) => {
    cy.get('.license-use-card').should('be.visible').contains(license)
})
Cypress.Commands.add('hasStepsCount', (stepsCount) => {
    cy.get('.stepper__container')
        .find('.step-container')
        .should('have.lengthOf', stepsCount)
})
