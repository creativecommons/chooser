describe("CopyrightWaiverStep.vue", () => {
    it("Check if CopyrightWaiver is rendered correctly", () => {
        cy.visit("/");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".next-button").click();
        cy.get("select").select("CC0 1.0");
        cy.get(".next-button").click();
    });

    it("Check if checkbox are present or not", () => {
        cy.get(".v-checkbox:nth-child(1)").should("be.visible");
        cy.get(".v-checkbox:nth-child(2)").should("be.visible");
    });

    it("Check if user can check and uncheck checkboxes", () => {
        cy.get(".next-button").should("be.disabled");
        cy.get(".step-actions")
            .find("input")
            .check();
        cy.get(".next-button").should("not.be.disabled");
        cy.get(".step-actions")
            .find("input")
            .uncheck();
        cy.get(".next-button").should("be.disabled");
    });
});
