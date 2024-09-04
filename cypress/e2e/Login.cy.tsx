describe('Login', () => {

  it("show password functionallity", () => {
    cy.visit('http://localhost:3000/login')
    cy.getByDataTestId("password").type("rahul@2021")
    cy.getByDataTestId("password").should("have.attr", "type", "password")

    cy.getByDataTestId("showPassword").check()
    cy.getByDataTestId("password").should("have.attr", "type", "text")

    cy.getByDataTestId("showPassword").uncheck()
    cy.getByDataTestId("password").should("have.attr", "type", "password")
  })

  it("Unsuccessful login", () => {
    cy.visit('http://localhost:3000/login')
    cy.getByDataTestId("username").type("rahul")
    cy.getByDataTestId("password").type("rahul@202")
    cy.getByDataTestId("login-button").click()
    cy.getByDataTestId("errorMsg").should('have.text', "* username and password didn't match")
  })

  it('Successful Login', () => {
    cy.visit('http://localhost:3000/login')
    cy.getByDataTestId("username").type("rahul")
    cy.getByDataTestId("password").type("rahul@2021")
    cy.getByDataTestId("login-button").click()
  })

  it('Successful Login with redirection', () => {
    cy.visit('http://localhost:3000/login')
    cy.getByDataTestId("username").type("rahul")
    cy.getByDataTestId("password").type("rahul@2021")
    cy.getByDataTestId("login-button").click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})



