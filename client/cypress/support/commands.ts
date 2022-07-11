/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      resetDatabase(): Chainable<void>;
      seedDatabase(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", "/api/test/reset");
});

Cypress.Commands.add("seedDatabase", () => {
  cy.request("POST", "/api/test/seed");
});
