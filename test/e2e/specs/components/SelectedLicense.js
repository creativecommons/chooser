module.exports = {

	'The title of the Selected License section' : function(browser) {
		browser
			.url(browser.globals.devServerURL)
			.waitForElementVisible('#app', 1000)
			.assert.elementPresent('.title')
			.assert.containsText('h2', 'Selected License')
	},

	'Default license "CC BY 4.0" and full license name display' : function(browser) {
		browser
			.assert.elementPresent('.selected-license-names')
			.assert.containsText('.selected-license-name', 'CC BY 4.0')
			.assert.containsText('.help', 'Atribution 4.0 International')
	},

	'Default license information and description' : function(browser) {
		browser
			.assert.elementPresent('#chooser-selected-share_adapt')
			.assert.containsText('#chooser-selected-share_adapt p', 'CC BY attribution means you allow people to')
			.assert.containsText('#generated-license-share', ' the material in any medium or format')
			.assert.containsText('#generated-license-adapt', ' it for any purpose, even commercially')
			.assert.containsText('#chooser-selected-description', 'As the most accommodating of licenses offered, the CC BY license allows others to distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation.')
			.end()
	},

	'Icon is clicked to select a license and information is changed accordingly': function(browser) {
        browser
        	.url(browser.globals.devServerURL)
			.waitForElementVisible('#app', 1000)
            .click('.nd')
            .pause(1000)
            .assert.containsText('.selected-license-name', 'CC BY-ND 4.0')
            .assert.containsText('#chooser-selected-description', 'The CC BY-ND license begins to become less accommodating. BY-ND stipulates that people are free to distribute your work, even commercially, and must credit you with the original creation, but they are not allowed to remix, tweak, or build upon your work.')
            .end()
            
    },

    'Description changes when CC BY-SA 4.0 license is choosen' : function(browser) {
    	browser
    		.url(browser.globals.devServerURL)
			.waitForElementVisible('#app', 1000)
    		.click('.sa')
    		.assert.containsText('.selected-license-name', 'CC BY-SA 4.0')
    		.assert.containsText('#chooser-selected-description', 'The CC BY-SA license is realtively accommodating. Similar to the CC BY license, BY-SA allows others to distribute')
    },

    'Click full license name directs url to https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser' : function(browser) {
    	browser
    		.url(browser.globals.devServerURL)
    		.waitForElementVisible('#app', 1000)
            .click('.help')
            .assert.urlEquals('https://creativecommons.org/licenses/by-sa/4.0/?ref=ccchooser')
            .end()
    }
}