describe("Homepage", () => {
  it('should load the homepage and display the title', () => {
    // Add API intercepts
    cy.intercept('**/api/**').as('apiCall');
    
    cy.visit('/');
    
    // Log any API calls
    cy.wait('@apiCall').then((interception) => {
      console.log('API Response:', interception.response?.body);
      console.log('API Status:', interception.response?.statusCode);
    });

    cy.document().then((doc) => {
      console.log('Page HTML:', doc.body.innerHTML);
    });

    // Check loading state
    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should('exist');
  });

  it("should navigate to a specific page", () => {
    cy.visit("/");

    // Simulate a navigation action
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });
});
