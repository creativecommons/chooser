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
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('button')
        .contains('NEXT')
        .click();
    })
});
Cypress.Commands.add('clickBack', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('button')
        .contains('BACK')
        .click();
    })
});

Cypress.Commands.add('clickInfo', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.fa-circle-info').click();
    })
});

Cypress.Commands.add('makeAChoice', (stepId, choice) => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get(stepId)
        .find(`[value="${choice}"]`)
        .check();
    })
});

Cypress.Commands.add('waiveCopyright', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.v-checkbox:nth-child(1) > input').check();
      startingCommand.get('.v-checkbox:nth-child(2) > input').check();
    })
});

Cypress.Commands.add('hasRecommendedLicense', license => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.recommended-card')
        .should('be.visible')
        .contains(license);
    })
});

Cypress.Commands.add('hasLicenseInAttributionCode', license => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.license-use-card')
        .should('be.visible')
        .contains(license);
    })
});

Cypress.Commands.add('hasStepsCount', stepsCount => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.stepper__container')
        .find('.step-container')
        .should('have.lengthOf', stepsCount);
    })
});

Cypress.Commands.add('missingLicenseInAttributionCode', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.license-use-card').should('not.exist');
    })
});

Cypress.Commands.add('headerTitle', license => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.license-short-name > .b-header').contains(license);
    })
});

Cypress.Commands.add('readableStringTitle', license => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('b').contains(license);
    })
});

Cypress.Commands.add('licenseText', license => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.license-text > a').contains(license);
    })
});

Cypress.Commands.add('copyButton', text => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.donate')
        .contains(text)
        .click();
    })
});

Cypress.Commands.add('missingInputField', id => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`, ).should('not.exist');
    })
});

Cypress.Commands.add('visibleInputField', id => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`, ).should('exist');
    })
});

Cypress.Commands.add('selectInputField', (id, text) => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`).type(text);
    })
});

Cypress.Commands.add('valueOfInputField', (id, attr) => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get(`:nth-child(${id}) > label.is-normal > .control-inner > .input`)
        .invoke('val')
        .then(text => {
          startingCommand.get(`${attr}`).contains(text);
        });
    })
});

Cypress.Commands.add('toggleButton', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('#copy-type').click();
    })
});

Cypress.Commands.add('openModal', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.modal').should('exist');
    })
});

Cypress.Commands.add('missingModal', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.modal').should('not.exist');
    })
});

Cypress.Commands.add('clickClose', () => {
  let startingCommand;
  cy.get('body')
    .then($body => {
      if ($body.find('iframe').length != 0) {
        startingCommand = getIFrame();
      } else
        startingCommand = cy;
    }).then(() => {
      startingCommand.get('.close-button').click();
    })
});
