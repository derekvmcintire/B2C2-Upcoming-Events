describe("Homepage", () => {
  it("should load the homepage and display the title", () => {
    cy.visit("/");
    // First wait for loading to appear
    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="expandable-table"]')
      .should("exist")
      .get('[data-testid="quick-view-button"]')
      .should("exist")
      .get('[data-testid="info-row"]')
      .should("exist")
      .get('[data-testid="interested-row"]')
      .should("exist")
      .get('[data-testid="interested-button"]')
      .should("exist")
      .get('[data-testid="housing-button"]')
      .should("exist")
      .get('[data-testid="hype"]')
      .should("exist");
  });

  it("should open the form drawer when the sub drawer button is clicked", () => {
    cy.visit("/");

    // Simulate clicking the submit new event button
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });

  // it("should open the form when interested button is clicked", () => {
  //   cy.visit("/");

  //   // Simulate clicking the interested rider button
  //   cy.get('[data-testid="loading"]', { timeout: 10000 })
  //     .should("exist")
  //     .get('[data-testid="interested-button"]', { timeout: 10000 }).click()
  //     .get('[data-testid="event-card-form-input"]').should("exist")
  //     .get('[data-testid="event-card-form-submit"]').should("exist");
  // });
});
