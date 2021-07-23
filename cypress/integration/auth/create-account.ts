import { canvasToBlob } from "blob-util";

describe("Create Account", () => {
  //   it("should see email/password error", () => {
  //     cy.visit("/");
  //     cy.findByText("Create an Account").click();
  //     cy.findByPlaceholderText("email").type("invalid@email");
  //     cy.findByText("Please enter a valid email");
  //     cy.findByPlaceholderText("email").clear();
  //     cy.findByText("Email is required");
  //     cy.findByPlaceholderText("password")
  //       .type("a")
  //       .clear();
  //     cy.findByText("Password is required");
  //   });

  it("should be able to create accout and login", () => {
    cy.intercept("http://localhost:4000/graphql", req => {
      console.log(req.body);
      const { operationName } = req.body;
      if (operationName && operationName === "CreateAccountMutation") {
        req.reply(res => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: "CreateAccountOutput"
              }
            }
          });
        });
      }
    });

    cy.visit("/create-account");
    cy.findByPlaceholderText("email").type("real@email.com");
    cy.findByPlaceholderText("password").type("realpassword");
    cy.findByRole("btn").click();
    cy.wait(1000);
    cy.title().should("eq", "Login | Delivery Service");
    // @ts-ignore
    cy.login("real@email.com", "realpassword");
  });
});
