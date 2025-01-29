describe("Homepage", () => {
  it('should load the homepage and display the title', () => {
    // Add API intercepts before visiting the page
    cy.intercept('**/api/**').as('apiCall');
    
    cy.visit('/');
    
    // Log API calls and page state
    cy.wait('@apiCall', { timeout: 10000 }).then((interception) => {
      console.log('API Call URL:', interception.request.url);
      console.log('API Response:', interception.response?.body);
      console.log('API Status:', interception.response?.statusCode);
    });

    cy.document().then((doc) => {
      console.log('Page State:', {
        html: doc.body.innerHTML,
        env: window.Cypress.env()
      });
    });

    // Then check for loading state
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
