module.exports = {

  'Check if the main div tag with the class selected-license-card is present': function(browser) {
    browser
      .init()
      .assert.elementPresent('.control-label > span')
      .click('.control-label > span')
      .assert.elementPresent('.next-button')
      .click('.next-button')
      .assert.elementPresent('.select')
      .click('.select')
      .click('option[value="CC BY-SA 4.0"]')
      .assert.elementPresent('.recommended-card')
  },
  'Check if the license deed link redirects correctly': function(browser) {
    browser
      .assert.elementPresent('a[class="license-deed-link"]')
      .getAttribute('a[class="license-deed-link"]', 'href', function(result) {
        this.assert.equal(result.value, 'http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1')
      })
  },
}
