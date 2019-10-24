module.exports = {
	beforeEach : function(browser) {
		const serverUrl = 'http://localhost:8080/';
		browser
			.url(serverUrl)
			.waitForElementVisible('#app', 1000)
	},

	'This is the title of the Selected License section' : function(browser) {
		browser
			.assert.elementPresent('.title')
			.assert.containsText('h2', 'Selected License')
	},

	'License information "CC BY 4.0" and Atribution display' : function(browser) {
		browser
			.assert.elementPresent('.selected-license-names')
			.assert.containsText('.selected-license-name', 'CC BY 4.0')
			.assert.containsText('.help', 'Atribution 4.0 International')
			.end()
	},

	'Information about choosen License' : function(browser) {
		browser
			.assert.elementPresent('#chooser-selected-share_adapt')
			.assert.containsText('p', 'CC BY  attribution means you allow people to')
			.assert.containsText('#generated-license-share', ' the material in any medium or format')
			.assert.containsText('#generated-license-adapt', ' it for any purpose, even commercially')
			.assert.containsText('#chooser-selected-description', 'As the most accommodating of licenses offered, the CC BY license allows others to distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation.')
			.end()
	}
}