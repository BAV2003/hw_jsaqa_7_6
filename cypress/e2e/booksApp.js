describe("BooksApp login Tests", () => {
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
});

describe("BooksApp books Tests", () => {

  let book;

  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit('/');
    cy.login("test@test.com", "test");
    book = {
      title: "American Gods",
      description: "A novel about old and new gods",
      author: "Neil Gaiman",
    }
  });

  it("Add favorite book", () => {
    cy.createNewBook(book);
    cy.visit("/favorites");
    cy.get(".card-title").contains(book.title);
  });

  it("Delete book from favorite", () => {
    cy.createNewBook(book);
    cy.visit("/favorites");
    cy.contains(book.title).should("be.visible")
      .within(() => cy.get(".card-footer > .btn")
      .click({ force: true }));
    cy.contains(book.title).should("not.exist");
  });
});