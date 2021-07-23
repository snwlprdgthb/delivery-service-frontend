// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("AssertLoggedIn", () => {
  cy.window()
    .its("localStorage.tuber-token")
    .should("be.a", "string");
});

Cypress.Commands.add("AssertLoggedOut", () => {
  cy.window()
    .its("localStorage.tuber-token")
    .should("be.undefined");
});

Cypress.Commands.add("login", (email, password) => {
  // @ts-ignore
  cy.AssertLoggedOut();
  cy.visit("/");
  cy.findByPlaceholderText("email").type(email);
  cy.findByPlaceholderText("password").type(password);
  cy.findByRole("btn")
    .should("not.have.class", "pointer-events-none")
    .click();
  // @ts-ignore
  cy.AssertLoggedIn();
});
