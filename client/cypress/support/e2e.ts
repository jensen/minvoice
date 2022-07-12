import "@cypress/code-coverage/support";
import "./commands";

before(() => {
  cy.resetDatabase();
  cy.seedDatabase();
});

after(() => {
  cy.resetDatabase();
});
