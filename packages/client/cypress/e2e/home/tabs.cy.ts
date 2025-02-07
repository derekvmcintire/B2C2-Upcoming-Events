/**
 * Test events change when tab is clicked.
 */
describe("Tab Change", () => {
  it("should change events when tab is clicked", () => {
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

    // expect loading state
    cy.get('[data-testid="loading"]', { timeout: 100 })
      .should("exist")
      // Then expect the default road events list
      .get('[data-testid="road-events-list"]')
      .should("exist");

    // Simulate clicking the cx tab
    cy.get('[data-testid="cx-events-tab"]').click();
    // expect the cx events list to load
    cy.get('[data-testid="cx-events-list"]', { timeout: 100 }).should("exist");

    // Simulate clicking the team tab
    cy.get('[data-testid="team-events-tab"]').click();
    // expect the cx events list to load
    cy.get('[data-testid="team-events-list"]', { timeout: 100 }).should(
      "exist",
    );
  });
});
