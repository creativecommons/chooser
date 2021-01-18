describe("LicenseDetailsCard.vue", () => {
    it("Checks whether the License Details Card is visible or not", () => {
        cy.visit("/");
        cy.get(".control-label > span").should("be.visible");
        cy.get(".step-0")
            .find("[value=yes]")
            .check();
        cy.get(".next-button").click();
        cy.get("select").select("CC BY-SA 4.0");
        cy.get(".recommended-card").should("be.visible");
    });

    it("Check if the license deed link redirects correctly", () => {
        cy.get("a[class='license-deed-link']")
            .should("be.visible")
            .should("have.attr", "href")
            .and(
                "eq",
                "http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1"
            );
    });
});
