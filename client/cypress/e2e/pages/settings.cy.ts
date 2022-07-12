describe("settings page", () => {
  beforeEach(() => {
    cy.intercept("/api/clients").as("getClients");
    cy.intercept("/api/projects").as("getProjects");

    cy.visit("/settings");

    cy.wait("@getClients");
    cy.wait("@getProjects");
  });

  describe("clients", () => {
    it("creates a new client", () => {
      cy.findByRole("textbox", { name: "Client Name" }).type("Test Client");
      cy.findByRole("button", { name: "Add Client" }).click();

      cy.findByRole("option", { name: "Test Client" }).should("be.selected");
    });

    it("validates name uniqueness", () => {
      cy.findByRole("textbox", { name: "Client Name" }).type("Unique Client");
      cy.findByRole("button", { name: "Add Client" }).click();

      cy.findByRole("option", { name: "Unique Client" }).should("be.selected");

      cy.findByRole("textbox", { name: "Client Name" }).type("Unique Client");
      cy.findByRole("button", { name: "Add Client" }).click();

      cy.findByText("The 'name' must be unique").should("exist");
    });

    it("validates name length", () => {
      cy.findByRole("button", { name: "Add Client" }).click();
      cy.findByText("Client name must be at least 3 characters").should(
        "exist"
      );
    });
  });

  describe("projects", () => {
    it("creates a new project", () => {
      cy.findByRole("textbox", { name: "Project Code" }).type("TEST");
      cy.findByRole("textbox", { name: "Project Name" }).type("Test Project");

      cy.findByRole("button", { name: "Add Project" }).click();

      cy.findByRole("table").within((table) => {
        cy.findByText("TEST").should("exist");
        cy.findByText("Test Project").should("exist");
      });
    });

    it("validates code and name uniqueness", () => {
      cy.findByRole("textbox", { name: "Project Code" }).type("UNIQUE");
      cy.findByRole("textbox", { name: "Project Name" }).type("Unique Project");

      cy.findByRole("button", { name: "Add Project" }).click();

      cy.findByText(/test project/i).should("exist");

      cy.findByRole("textbox", { name: "Project Code" }).clear().type("UNIQUE");
      cy.findByRole("textbox", { name: "Project Name" }).type("Unique Project");

      cy.findByRole("button", { name: "Add Project" }).click();

      cy.findByText("The 'code' must be unique").should("exist");

      cy.findByRole("textbox", { name: "Project Code" })
        .clear()
        .type("DIFFERENT");

      cy.findByRole("button", { name: "Add Project" }).click();

      cy.findByText("The 'name' must be unique").should("exist");
    });

    it("validates code and name length", () => {
      cy.findByRole("button", { name: "Add Project" }).click();
      cy.findByText("Project code must be at least 3 characters").should(
        "exist"
      );
      cy.findByText("Project name must be at least 3 characters").should(
        "exist"
      );
    });
  });
});
