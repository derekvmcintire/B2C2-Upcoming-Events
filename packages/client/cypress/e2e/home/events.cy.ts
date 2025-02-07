describe("Homepage", () => {
  beforeEach(() => {
    // Common intercept that's needed for all tests
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fwww.crossresults.com%2Fapi%2Fb2c2lookup.php*",
      { fixture: "registrations.json" },
    );
  });

  it("should render the CX events list when cx tab param is passed", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22cx%22%7D",
      { fixture: "cx-events.json" },
    );

    cy.visit("/?tab=cx");

    cy.get('[data-testid="loading"]').should("exist");
    cy.get('[data-testid="loading"]').should("not.exist");

    cy.get('[data-testid="cx-events-list"]').should("exist");

    // 67842 is the first event's id
    cy.get('[data-testid="cx-events-list"]')
      .find('[data-testid="67842"]')
      .should("exist");

    // click the first row of the table
    cy.get('[data-testid="cx-events-list"]').find("tr").first().click();

    // first event should expand and the event card should be found
    cy.get('[data-testid="event-card-67842"]').should("exist");
  });
});
