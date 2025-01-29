describe("Homepage", () => {
  it("should load the homepage and display the title", () => {
    // Visit the base URL (set in cypress.config.ts)
    cy.visit("/");

    // Check if the title exists
    cy.contains("B2C2 Event Calendar").should("be.visible");
    cy.get('[data-testid="nav"]').should("exist");
    cy.get('[data-testid="sub-drawer-button"]').should("exist");
    // cy.get('[data-testid="loading"]').should("exist");
  });

  it("should navigate to a specific page", () => {
    cy.visit("/");

    // Simulate a navigation action
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });
});
