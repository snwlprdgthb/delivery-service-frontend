describe("Edit Profile", () => {
  beforeEach(() => {
    //@ts-ignore
    cy.login("real@email.com", "realpassword");
  });

  it("can go to /edit-profile using the header", () => {
    //@ts-ignore
    cy.get('a[href="/edit-profile"]').click();
    cy.wait(1000);
    cy.title().should("eq", "Login | Delivery Service");
  });

  it("can edit email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
        console.log(req.body);
        if(req.body?.operationName === "editProfile") {
       // @ts-ignore
         req.body?.variables?.input?.email = "real@email.com"
        }
    });
    cy.visit("/edit-profile");
    cy.findByPlaceholderText("email")
      .clear()
      .type("new@email.com");
    cy.findByRole("btn").click();
  });
});
