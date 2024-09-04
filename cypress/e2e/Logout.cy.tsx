describe("Logout", () => {

    beforeEach(() => {
        cy.login("rahul", "rahul@2021")
        cy.visit('http://localhost:3000/')
    })

    it("successful logout", () => {
        cy.get('[data-testid="nav-desktop"] [data-testid="Logout"]').click();
        cy.getByDataTestId("confirm").click()
    })

    it("unsuccessful logout", () => {
        cy.get('[data-testid="nav-desktop"] [data-testid="Logout"]').click();
        cy.getByDataTestId("cancel").click()
    })
})