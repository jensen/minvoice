describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept("/api/clients").as("getClients");
    cy.intercept("/api/projects").as("getProjects");

    cy.visit("/time/day/2022/6/1/new");

    cy.wait("@getClients");
    cy.wait("@getProjects");
  });

  it("creates an entry", () => {
    cy.findByRole("button", { name: "Choose Project" }).click();
    cy.findByRole("option", { name: "[FIRST] First Project" }).click();

    cy.findByPlaceholderText("Notes").type("Test description");
    cy.findByPlaceholderText("0:00").type("1:00");

    cy.findByRole("button", { name: "Save" }).click();

    cy.findByRole("button", { name: "Save" }).should("not.exist");

    cy.findByText("Test description").should("exist");
  });

  it("closes with cancel opens with new entry", () => {
    cy.findByText("New entry for Wednesday, June 1").should("exist");

    cy.findByRole("button", { name: "Cancel" }).click();

    cy.findByText("New entry for Wednesday, June 1").should("not.exist");

    cy.findByRole("button", { name: "New Entry" }).click();

    cy.findByText("New entry for Wednesday, June 1").should("exist");
  });
});
