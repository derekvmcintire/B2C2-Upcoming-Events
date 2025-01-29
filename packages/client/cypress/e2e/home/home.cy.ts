describe("Homepage", () => {
  it('should load the homepage and display the title', () => {
    // Intercept ALL network requests to log them
    cy.intercept('**/*', (req) => {
      console.log(`Request made to: ${req.url}`);
      req.continue();
    }).as('allRequests');
    
    cy.visit('/');
    
    // Wait and log all requests
    cy.wait('@allRequests').then((interception) => {
      console.log('Network call made:', {
        url: interception.request.url,
        method: interception.request.method,
        response: interception.response?.body
      });
    });

    // Add debug logging
    cy.window().then((win) => {
      console.log('Environment Variables:', {
        nodeEnv: win.process?.env?.NODE_ENV,
        apiUrl: win.process?.env?.VITE_API_URL,
      });
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
