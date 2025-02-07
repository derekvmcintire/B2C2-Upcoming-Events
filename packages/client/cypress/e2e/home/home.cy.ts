/**
 * Test suite for the homepage.
 */
describe("Homepage", () => {
  /**
   * Test that the home page loads correctly.
   */
  it("should load the homepage and display the title", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fwww.crossresults.com%2Fapi%2Fb2c2lookup.php&params=%7B%22discipline%22%3A%22road%2520race%22%2C%22after%22%3A%222025-02-05%22%7D",
      { fixture: "registrations.json" },
    );
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22road%22%7D",
      { fixture: "events.json" },
    );

    cy.visit("/");
    // First wait for loading to appear
    cy.get('[data-testid="loading"]', { timeout: 100 })
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

  /**
   * Test that default events load correctly.
   */
  it("should default to the road events list", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fwww.crossresults.com%2Fapi%2Fb2c2lookup.php&params=%7B%22discipline%22%3A%22road%2520race%22%2C%22after%22%3A%222025-02-05%22%7D",
      { fixture: "registrations.json" },
    );
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22road%22%7D",
      { fixture: "events.json" },
    );

    cy.visit("/");

    cy.get('[data-testid="loading"]', { timeout: 100 })
      .should("exist")
      // Then check the expected components
      .get('[data-testid="road-events-list"]')
      .should("exist");
  });
});
