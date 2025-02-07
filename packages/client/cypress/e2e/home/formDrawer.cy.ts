/**
 * Test that the form drawer opens correctly.
 */
it("should open the form drawer when the sub drawer button is clicked", () => {
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

  // Simulate clicking the submit new event button
  cy.get('[data-testid="sub-drawer-button"]').click();
  cy.get('[data-testid="sub-control"]').should("exist");
});
