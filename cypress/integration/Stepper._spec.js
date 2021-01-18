describe("Stepper.vue", () => {
    it("renders correctly", () => {
        cy.visit("http://localhost:8080/ ");
    });

    it("Step one: open License Chooser page", () => {
        cy.get(".stepper__container").should("be.visible");
    });

    it("Step two: selecting 'I need help' opens license attribute steps and selected license card", () => {
        cy.get(".step-0")
            .find("[value=no]")
            .check();
        cy.get(".is-success").click();
    });

    it("Step three: going through license attribute steps opens license use card and Attribution Details Step", () => {
        cy.get(".step-1")
            .find("[value=yes]")
            .check();
        cy.get(".is-success").click();
        cy.get(".step-2")
            .find("[value=yes]")
            .click();
        cy.get(".is-success").click();
        cy.get(".step-3")
            .find("[value=yes]")
            .click();
        cy.get(".is-success").click();
        cy.get(".step-4")
            .find("[value=yes]")
            .click();
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
    });

    it("Can choose CC0 1.0 license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC0 1.0");
        cy.get(".is-success").click();
        cy.get(".step-actions")
            .find("input")
            .check();
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC0 1.0");
    });

    it("Can choose CC BY 4.0 license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY 4.0");
    });

    it("Can choose CC BY-NC license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-NC 4.0");
    });

    it("Can choose CC BY-ND license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-ND 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-ND 4.0");
    });

    it("Can choose CC BY-NC-ND license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC-ND 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-NC-ND 4.0");
    });

    it("Can choose CC BY-SA license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-SA 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-SA 4.0");
    });

    it("Can choose CC BY-NC-SA license", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC-SA 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-NC-SA 4.0");
    });
    it("Can select a license from dropdown", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC-ND 4.0");
        cy.get(".is-success").click();
        cy.get(".license-use-card").should("be.visible");
        cy.get(".attribution-tabs > .tabs-content").contains("CC BY-NC-ND 4.0");
    });

    it("Can go back by clicking on Previous button", () => {
        cy.visit("http://localhost:8080/ ");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC-ND 4.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC-SA 4.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-SA 4.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-NC 4.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY 4.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC0 1.0");
        cy.get(".is-border").click();
        cy.get(".step-navigation > .button").click();
        cy.get("select").select("CC BY-ND 4.0");
        cy.get(".is-border").click();
    });
});
