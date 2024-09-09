describe("Header", () => {

    
      

    beforeEach(() => {
        cy.login("rahul", "rahul@2021")
        cy.visit('http://localhost:3000/')
    })

    it("toggle dark theme and light theme in mobile", () => {
        cy.viewport("iphone-6")
        cy.getByDataTestId("mobile-theme").click()

        cy.getByDataTestId("mobile-theme").click()
    })

    it("toggle dark theme and light theme in desktop", () => {
        cy.getByDataTestId("desktop-theme").click()

        cy.getByDataTestId("desktop-theme").click()
    })

    it("should logo render correctly according to toggle light and dark theme in mobile", () => {
        cy.viewport("iphone-6")

        cy.getByDataTestId("mobile-theme").click()

        cy.getByDataTestId("website-logo").should("have.attr", "src", "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png")

        cy.getByDataTestId("mobile-theme").click()

        cy.getByDataTestId("website-logo").should("have.attr", "src", "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png")
    }) 

    it("should logo render correctly according to toggle light and dark theme in desktop", () => {
        cy.getByDataTestId("desktop-theme").click()

        cy.getByDataTestId("website-logo").should("have.attr", "src", "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png")

        cy.getByDataTestId("desktop-theme").click()

        cy.getByDataTestId("website-logo").should("have.attr", "src", "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png")

    })

    it("should logout and redirecting to login page in mobile", () => {
        cy.viewport("iphone-6")

        cy.get('[data-testid="nav-mobile"] [data-testid="Logout"]').click();

        cy.getByDataTestId("confirm").click()

        cy.url().should("eq", "http://localhost:3000/login")
    })

    it("should logout and redirecting to login page in desktop", () => {

        cy.get('[data-testid="nav-desktop"] [data-testid="Logout"]').click();

        cy.getByDataTestId("confirm").click()

        cy.url().should("eq", "http://localhost:3000/login")

    })
})



