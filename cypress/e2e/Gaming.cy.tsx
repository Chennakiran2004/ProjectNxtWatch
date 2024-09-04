describe("Gaming", () => {

    beforeEach(() => {
        cy.login("rahul", "rahul@2021")
        cy.visit("http://localhost:3000/");
    });


    it("Should display the loader with fetching videos", () => {
        cy.getByDataTestId("gamingIcon").click();
        cy.url().should("include", "/gaming");
        cy.intercept('GET', '**/videos/gaming', { delay: 2000, fixture: 'GamingVideos.json' }).as('fetchGamingVideos');
        cy.intercept('GET', 'cypress/fixtures/GamingVideos.json', { delay: 2000, fixture: 'GamingVideos.json' }).as('fetchGamingVideos')
        cy.get('[data-testid="loader"]').should('be.visible');
        cy.wait('@fetchGamingVideos');
        cy.get('[data-testid="loader"]').should('not.exist');
    })

    it("displays gaming videos after successfully fetching them", () => {
        cy.getByDataTestId("gamingIcon").click();
        cy.url().should("include", "/gaming");
        cy.intercept('GET', '**/videos/gaming', { fixture: 'GamingVideos.json' }).as('fetchGamingVideos');
        cy.wait('@fetchGamingVideos')
        cy.get('[data-testid="layout"] [data-testid="gaming-container"]').within(() => {
            cy.getByDataTestId('gaming-success-view').within(() => {
                cy.get('div').should("have.length", 20);
                cy.contains("Epic Battle Royale");
            })
        })
    })

    it("displays error message when fetching videos fails", () => {
        cy.getByDataTestId("gamingIcon").click();
        cy.url().should("include", "/gaming");
        cy.intercept('GET', '**/videos/gaming', { statusCode: 500, body: {error: 'Something went wrong!'}, delay: 2000 }).as('fetchGamingVideos');
        cy.wait("@fetchGamingVideos")
        cy.get('[data-testid="layout"] [data-testid="gaming-container"]').within(() => {
            cy.get('[data-testid="gaming-failure-view"]').within(() => {
                cy.contains("Oops! Something Went Wrong");
                cy.contains("We are having some trouble to complete your request. Please try again");
                cy.get('button').contains("Retry").should('be.visible');
            });
        })
    })
})

