describe("DropDownStep.vue", () => {
    it("Checks whether drop down is visible or not and working of Drop down", () => {
        cy.visit("/");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".next-button").click();
        cy.get("select").select("CC BY 4.0");
        cy.get(".next-button").should("not.be.disabled");
        cy.get(".next-button").click();
        cy.get(".DD .step-header__caption")
            .should("be.visible")
            .contains("Attribution 4.0 International");
    });
});
