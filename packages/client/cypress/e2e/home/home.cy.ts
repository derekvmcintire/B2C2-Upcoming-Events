describe("Homepage", () => {
  it('should load the homepage and display the title', () => {
    // Intercept ALL network requests to log them
    cy.intercept('**/*', (req) => {
      console.log(`Request made to: ${req.url}`);
      req.continue();
    }).as('allRequests');
    
    cy.visit('/');

    cy.intercept('/api/proxy*', (req) => {
      console.log('Proxy request:', {
        url: req.url,
        query: req.query,
        headers: req.headers
      });
      req.continue((res) => {
        console.log('Proxy response:', {
          status: res.statusCode,
          body: res.body
        });
      });
    }).as('proxyRequest');
    
    cy.wait('@proxyRequest').then((interception) => {
      console.log('Proxy interception:', interception);
    });

    cy.document().then((doc) => {
      console.log('Page HTML:', doc.body.innerHTML);
    });

    // Check loading state
    cy.get('[data-testid="no-events-found"]', { timeout: 10000 })
      .should('exist');
  });



  it("should navigate to a specific page", () => {
    cy.visit("/");

    // Simulate a navigation action
    cy.get('[data-testid="sub-drawer-button"]').click();
    cy.get('[data-testid="sub-control"]').should("exist");
  });
});
