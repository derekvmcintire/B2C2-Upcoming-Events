describe("URL Tab Params", () => {
  beforeEach(() => {
    // Common intercept that's needed for all tests
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fwww.crossresults.com%2Fapi%2Fb2c2lookup.php*",
      { fixture: "registrations.json" },
    );
  });

  it("should render the road events list when road tab param is passed", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22road%22%7D",
      { fixture: "road-events.json" },
    );

    // vist the road tab url
    cy.visit("/?tab=road");

    // Wait for loading state to appear and disappear
    cy.get('[data-testid="loading"]').should("exist");
    cy.get('[data-testid="loading"]').should("not.exist");

    // Verify correct list is shown
    cy.get('[data-testid="road-events-list"]').should("exist");
  });

  it("should render the CX events list when cx tab param is passed", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22cx%22%7D",
      { fixture: "cx-events.json" },
    );

    // visit page
    cy.visit("/?tab=cx");

    // check loading state
    cy.get('[data-testid="loading"]').should("exist");
    cy.get('[data-testid="loading"]').should("not.exist");

    //check the events list is rendered
    cy.get('[data-testid="cx-events-list"]').should("exist");
  });

  it("should render the CX events list with a specific event open", () => {
    cy.intercept(
      "GET",
      "/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22cx%22%7D",
      { fixture: "cx-events.json" },
    );

    // visit the page
    cy.visit("/?tab=cx&events=67842");

    // check loading state
    cy.get('[data-testid="loading"]').should("exist");
    cy.get('[data-testid="loading"]').should("not.exist");

    // check list is rendered
    cy.get('[data-testid="cx-events-list"]').should("exist");

    // check first event is expanded and the event card is found
    cy.get('[data-testid="event-card-67842"]').should("exist");
  });
});
