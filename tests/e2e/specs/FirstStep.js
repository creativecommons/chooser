module.exports = {
    '@tags': ['first'],
    'FirstStep'(browser){
        const yesRadioSelector = '#site-container > div.columns > div.stepper-container.column > div.step-container.current.enabled > div.step-content > div > div.field.not-selected > label > span.check'
        const noRadioSelector = '#site-container > div.columns > div.stepper-container.column > div.step-container.current.enabled > div.step-content > div > div.field.not-selected > label > span.check'
        const attributionHeader = '#site-container > div.columns > div.stepper-container.column > div:nth-child(2) > div > h5'
        const ccLicenseHeader = '#site-container > div.columns > div.stepper-container.column > div:nth-child(2) > div'
        const nextBtn = '.pagination-next'
       
        browser
            .init()
            .click(yesRadioSelector)
            .assert.visible(ccLicenseHeader, 'Click yes:Creative Commons License header is visible in the step below FirstStep')
            .assert.visible(nextBtn, 'Next button is visible')
            .click(noRadioSelector)
            .assert.visible(attributionHeader, 'Click no:Attribution header is visible in the step below FirstStep')
    }        
}