const { defineConfig } = require('cypress')

module.exports = defineConfig({
  project: 'creativecommons-chooser',
  chromeWebSecurity: false,
  includeShadowDom: true,
  fixturesFolder: 'tests/cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080/',
    specPattern: 'tests/cypress/integration//**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
  },
})
