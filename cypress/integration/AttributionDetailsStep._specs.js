describe("AttributionDetailsStep.vue", () => {
    describe("Attribution Details Step Form testing", () => {
        it("renders correctly", () => {
            cy.visit("/");
            cy.get(".step-0")
                .find("[value=yes]")
                .check();
            cy.get(".next-button").click();
            cy.get("select").select("CC BY 4.0");
            cy.get(".next-button").click();
        });

        it("Checks whether title is visible", () => {
            cy.get(".step-header__title").should("be.visible");
        });

        it("Checks whether Work Author Label is visible", () => {
            cy.get(
                ".step-content > div > form > div:nth-child(1) > label"
            ).should("be.visible");
        });

        it("Checks whether Work Author Input", () => {
            cy.get("form > div:nth-child(1) input").should("be.visible");
        });

        it("Checks whether Url Creator Profile Label is visible", () => {
            cy.get("form > div:nth-child(2) > label").should("be.visible");
        });

        it("Checks whether Url Creator Profile Input is visible", () => {
            cy.get("form > div:nth-child(2) input").should("be.visible");
        });

        it("Checks whether Work Url Label is visible ", () => {
            cy.get("form > div:nth-child(3)  label").should("be.visible");
        });

        it("Checks whether Work Url Input is visible ", () => {
            cy.get("form > div:nth-child(4) input").should("be.visible");
        });

        it("Checks whether Work Title Label is visible ", () => {
            cy.get("form > div:nth-child(3)  label").should("be.visible");
        });

        it("Checks whether Work Title Input is visible ", () => {
            cy.get("form > div:nth-child(3)  input").should("be.visible");
        });

        it("Checks whether Back Button is visible ", () => {
            cy.get(".previous-button").should("be.visible");
        });

        it("Checks whether Done Button is visible ", () => {
            cy.get(".done-button").should("be.visible");
        });

        it("Checks whether Restart Button is visible ", () => {
            cy.get(".restart-button").should("be.visible");
        });
    });
});
