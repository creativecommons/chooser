module.exports = {

    'feedback redirects to https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform': function(browser) {
        browser
            .init()
            .assert.elementPresent('#navbar-item-feedback')
            .click('#navbar-item-feedback')
            .assert.urlEquals('https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform')
            
    }

    
    
}
