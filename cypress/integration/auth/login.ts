import { canvasToBlob } from "blob-util";

describe("Log In", () => {
  it("should see  login page", () => {
    cy.visit("/")
      .title()
      .should("eq", "Login | Delivery Service");
  });

  it("can see email / password valid errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText("email").type("invalid@email");
    cy.findByRole("btn");
    cy.findByText("Please enter a valid email");
    cy.findByPlaceholderText("email")
      .clear()
      .type("valid@email.com");
    cy.findByPlaceholderText("password")
      .type("a")
      .clear();
    cy.findByText("Password is required");
  });

  it("can fill out of the form", () => {
    // @ts-ignore
    cy.login("real@email.com", "realpassword");
    // to do (can log in)
  });
});
