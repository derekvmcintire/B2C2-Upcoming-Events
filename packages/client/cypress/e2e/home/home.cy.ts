describe("Homepage", () => {
  it("should load the homepage and display the title", () => {
    cy.visit("/");

    cy.document().then((doc) => {
      console.log("Page HTML:", doc.body.innerHTML);
    });

    // First wait for loading to appear
    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then wait for the table to appear (meaning loading is complete)
      .get('[data-testid="expandable-table"]')
      .should("exist")
      // Then wait for the table to appear (meaning loading is complete)
      .get('[data-testid="detail-view-button"]')
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

  it("should navigate to a specific page", () => {
    cy.visit("/");

    // Simulate a navigation action
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });
});
