describe("BooksApp Tests", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit('/');
  });

  it("Shoud successfully login", () => {
    cy.login("test@test.com", "test")
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(null, "test");
    cy.get("#mail").then((el) => el[0].checkValidity()).should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.login("test@test.com", null);
    cy.get("#pass").then((el) => el[0].checkValidity()).should("be.false");
  });

  it("Add favorite book", () => {
    cy.login("test@test.com", "test");
    cy.contains("Add new").click();
    cy.get("#title").type("American Gods");
    cy.get("#description").type("A novel about old and new gods");
    cy.get("#authors").type("Neil Gaiman");
    cy.contains("Submit").click();
    cy.visit("/favorites");
    cy.get(".card-title").contains("American Gods");
  });
});
