describe("Homepage", () => {
  it("should load the homepage and display the title", () => {
    cy.visit("/");
    // First wait for loading to appear
    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="expandable-table"]')
      .should("exist")
      .get('[data-testid="detail-view-button"]')
      .should("exist")
      .get('[data-testid="interested-button"]')
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

  it("should default to the road events list", () => {
    cy.visit("/");

    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="road-events-list"]')
      .should("exist");
  });

  it("should render the road events list when road tab param is passed", () => {
    cy.visit("/?tab=road");

    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="road-events-list"]')
      .should("exist");
  });

  it("should render the CX events list when cx tab param is passed", () => {
    cy.visit("/?tab=cx");

    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="cx-events-list"]')
      .should("exist");
  });

  it("should render the XC events list when xc tab param is passed", () => {
    cy.visit("/?tab=xc");

    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="xc-events-list"]')
      .should("exist");
  });

  it("should render the Team events list when special tab param is passed", () => {
    cy.visit("/?tab=special");

    cy.get('[data-testid="loading"]', { timeout: 10000 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="team-events-list"]')
      .should("exist");
  });

});
