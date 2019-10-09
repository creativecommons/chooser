const defaultHtml = '<p style="font-size: 0.9rem;font-style: italic;"><a href="">"This work"</a>' +
    ' is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=ccchooser" ' +
    'style="margin-right: 5px;">CC BY 4.0</a><a href="https://creativecommons.org/licenses/by/4.0/?ref=ccchooser" ' +
    'target="_blank" rel="noopener noreferrer" style="display: inline-block;white-space: none;opacity: .7;' +
    'margin-top: 2px;margin-left: 3px;height: 22px !important;"><img style="height: inherit;margin-right: 3px;' +
    'display: inline-block;" src="https://search.creativecommons.org/static/img/cc_icon.svg" />' +
    '<img style="height: inherit;margin-right: 3px;display: inline-block;" ' +
    'src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a></p>'
const ccByName = 'CC BY 4.0'
const ccByNcName = 'CC BY-NC 4.0'
const ccByNdName = 'CC BY-ND 4.0'
const ccNcByURL = 'https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser'
const newObject = {
    workTitle: 'newWorkTitle',
    attributeToName: 'newAttributeToName',
    attributeToURL: 'https://new_attribute_to_url.com',
    sourceWorkURL: 'https://new_source_work_url.com',
    workLocation: 'https://new_work_location.com'
}

module.exports = {
    'step one: navigate to home page': function(browser) {
        const devServer = browser.globals.devServerURL
        browser
            .url(devServer)
            .waitForElementVisible('#app', 1000)
            .assert.elementPresent('#attribution-html')
            .assert.containsText('#attribution-richtext', 'CC BY 4.0')
            .assert.valueContains('#attribution-html', defaultHtml)
        browser.expect.element('#attribution-richtext').text.to.equal('This work is licensed under ' + ccByName)
        browser.expect.element('#attribution-html').text.to.not.contain('NC')
        browser.expect.element('#attribution-html').text.to.not.contain('SA')
        browser.expect.element('#attribution-html').text.to.not.contain('ND')
    },
    'step two: click nc icon': function(browser) {
        browser
            .click('.nc')
            .pause(1000)
            .assert.valueContains('#attribution-html', ccNcByURL)
        browser.expect.element('#attribution-richtext').text.to.equal('This work is licensed under ' + ccByNcName)
        browser.click('.nc')
    },
    'step three: click nd icon': function(browser) {
        browser
            .click('.nd')
            .pause(1000)
            .assert.valueContains('#attribution-html', ccByNdName)
        browser.expect.element('#attribution-richtext').text.to.equal('This work is licensed under ' + ccByNdName)
    },
    'step four: input additional information': function(browser) {
        const attributionHtml = '//textarea[@id="attribution-html"]'
        const attributionRichtext = '//*[@id="attribution-richtext"]'
        const workTitleLink = `<a href="${newObject.workLocation}">"${newObject.workTitle}"</a>`
        const attributionLink = `by <a href="${newObject.attributeToURL}">${newObject.attributeToName}</a>`
        const aXpath = `//a[@href="${newObject.workLocation}"]`
        const aAttributeXpath = `//a[@href="${newObject.attributeToURL}"]`
        browser
            .useXpath()
            .clearValue('(//input[@class="input"])[1]')
            .clearValue('(//input[@class="input"])[2]')
            .clearValue('(//input[@class="input"])[3]')
            .clearValue('(//input[@class="input"])[4]')
            .clearValue('(//input[@class="input"])[5]')
            .clearValue('(//input[@class="input"])[6]')

            .setValue('(//input[@class="input"])[1]', newObject.workTitle)
            .assert.valueContains(attributionHtml,
                newObject.workTitle + '"</a>',
                'Testing that generated html contains new title')
            .assert.containsText(attributionRichtext,
                newObject.workTitle,
                'Testing that generated rich text contains new title')

            .setValue('(//input[@class="input"])[2]', newObject.workLocation)
            .assert.elementPresent(aXpath, 'Testing that generated rich text contains new work location link')
            .assert.valueContains(attributionHtml, workTitleLink,
                'Testing that generated html contains new work title link')

            .setValue('(//input[@class="input"])[6]', newObject.attributeToName)
            .assert.containsText(attributionRichtext,
                newObject.attributeToName,
                'Testing that generated rich text contains attribution name')

            .setValue('(//input[@class="input"])[3]', newObject.attributeToURL)
            .assert.elementPresent(aAttributeXpath,
                'Testing that generated rich text contains attribution url')
            .assert.valueContains(attributionHtml, attributionLink,
                'Testing that generated html contains attribution url and name <' + attributionLink + '>')
            .end()
    }

}
