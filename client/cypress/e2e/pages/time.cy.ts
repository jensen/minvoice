describe("time page", () => {
  beforeEach(() => {
    cy.intercept("/api/clients").as("getClients");
    cy.intercept("/api/projects").as("getProjects");
    cy.intercept("/api/entries").as("getEntries");

    cy.visit("/time/day/2022/6/1");

    cy.wait("@getClients");
    cy.wait("@getProjects");
    cy.wait("@getEntries");
  });

  it("navigates days with buttons", () => {
    cy.findByText("Wednesday, June 1").should("exist");

    cy.findByRole("button", { name: "Previous Day" }).click();

    cy.findByText("Tuesday, May 31").should("exist");

    cy.findByRole("button", { name: "Wednesday 1:00" }).click();

    cy.findByText("Wednesday, June 1").should("exist");

    cy.findByRole("button", { name: "Next Day" }).click();

    cy.findByText("Thursday, June 2").should("exist");
  });

  it("navigates days with arrow keys", () => {
    cy.findByText("Wednesday, June 1").should("exist");

    cy.get("body").type("{leftArrow}");

    cy.findByText("Tuesday, May 31").should("exist");

    cy.get("body").type("{rightArrow}");

    cy.findByText("Wednesday, June 1").should("exist");

    cy.get("body").type("{rightArrow}");

    cy.findByText("Thursday, June 2").should("exist");
  });
});
