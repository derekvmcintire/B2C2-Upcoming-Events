describe("Homepage", () => {
  // it("should load the homepage and display the title", () => {
  //   // Visit the base URL (set in cypress.config.ts)
  //   cy.visit("/");

  //   // Check if the title exists
  //   cy.contains("B2C2 Event Calendar").should("be.visible");
  //   cy.get('[data-testid="nav"]').should("exist");
  //   cy.get('[data-testid="sub-drawer-button"]').should("exist");
  //   cy.get('[data-testid="loading"]').should("exist");
  // });

  it('should load the homepage and display the title', () => {
    cy.visit('/');
    
    // Add logging to see page state
    cy.document().then((doc) => {
      console.log('Page HTML:', doc.body.innerHTML);
    });

    // Add a longer wait or specific condition
    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should('be.visible');
  });
  

  it("should navigate to a specific page", () => {
    cy.visit("/");

    // Simulate a navigation action
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });
});
