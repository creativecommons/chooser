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

const getIFrame = () => cy.get('iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap)

Cypress.Commands.add('clickNext', () => {
  getIFrame().get('button')
    .contains('NEXT')
    .click();
});
Cypress.Commands.add('clickBack', () => {
  getIFrame().get('button')
    .contains('BACK')
    .click();
});

Cypress.Commands.add('clickInfo', () => {
  getIFrame().get('.fa-circle-info').click();
});

Cypress.Commands.add('makeAChoice', (stepId, choice) => {
  getIFrame().get(stepId)
    .find(`[value="${choice}"]`)
    .check();
});

Cypress.Commands.add('waiveCopyright', () => {
  getIFrame().get('.v-checkbox:nth-child(1) > input').check();
  getIFrame().get('.v-checkbox:nth-child(2) > input').check();
});

Cypress.Commands.add('hasRecommendedLicense', license => {
  getIFrame().get('.recommended-card')
    .should('be.visible')
    .contains(license);
});

Cypress.Commands.add('hasLicenseInAttributionCode', license => {
  getIFrame().get('.license-use-card')
    .should('be.visible')
    .contains(license);
});

Cypress.Commands.add('hasStepsCount', stepsCount => {
  getIFrame().get('.stepper__container')
    .find('.step-container')
    .should('have.lengthOf', stepsCount);
});

Cypress.Commands.add('missingLicenseInAttributionCode', () => {
  getIFrame().get('.license-use-card').should('not.exist');
});

Cypress.Commands.add('headerTitle', license => {
  getIFrame().get('.license-short-name > .b-header').contains(license);
});

Cypress.Commands.add('readableStringTitle', license => {
  getIFrame().get('b').contains(license);
});

Cypress.Commands.add('licenseText', license => {
  getIFrame().get('.license-text > a').contains(license);
});

Cypress.Commands.add('copyButton', text => {
  getIFrame().get('.donate')
    .contains(text)
    .click();
});

Cypress.Commands.add('missingInputField', id => {
  getIFrame().get(
    `:nth-child(${id}) > label.is-normal > .control-inner > .input`,
  ).should('not.exist');
});

Cypress.Commands.add('visibleInputField', id => {
  getIFrame().get(
    `:nth-child(${id}) > label.is-normal > .control-inner > .input`,
  ).should('exist');
});

Cypress.Commands.add('selectInputField', (id, text) => {
  getIFrame().get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`).type(
    text,
  );
});

Cypress.Commands.add('valueOfInputField', (id, attr) => {
  getIFrame().get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`)
    .invoke('val')
    .then(text => {
      getIFrame().get(`${attr}`).contains(text);
    });
});

Cypress.Commands.add('toggleButton', () => {
  getIFrame().get('#copy-type').click();
});

Cypress.Commands.add('openModal', () => {
  getIFrame().get('.modal').should('exist');
});

Cypress.Commands.add('missingModal', () => {
  getIFrame().get('.modal').should('not.exist');
});

Cypress.Commands.add('clickClose', () => {
  getIFrame().get('.close-button').click();
});
