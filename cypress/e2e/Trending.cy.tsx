describe("Trending", () => {

    beforeEach(() => {
        cy.login("rahul", "rahul@2021");
        cy.visit("http://localhost:3000/");
    });

    it("Should display the loader while fetching videos", () => {
        cy.getByDataTestId("trendingIcon").click();
        cy.url().should("include", "/trending");
        cy.intercept('GET', '**/videos/trending', { delay: 2000, fixture: 'TrendingVideos.json' }).as('fetchTrendingVideos');
        cy.get('[data-testid="loader"]').should('be.visible');
        cy.wait('@fetchTrendingVideos');
        cy.get('[data-testid="loader"]').should('not.exist');
    });

    it("displays trending videos after successfully fetching them", () => {
        cy.getByDataTestId("trendingIcon").click();
        cy.url().should("include", "/trending");
        cy.intercept('GET', '**/videos/trending', { fixture: 'TrendingVideos.json' }).as('fetchTrendingVideos');
        cy.wait('@fetchTrendingVideos');
        cy.get('[data-testid="layout"] [data-testid="trending-container"]').within(() => {
            cy.getByDataTestId('trending-success-view').within(() => {
                cy.contains("Epic Battle Royale");
            });
        });
    });

    it("shows error message when fetching trending videos fails", () => {
        cy.getByDataTestId("trendingIcon").click();
        cy.url().should("include", "/trending");
        cy.intercept('GET', '**/videos/trending', {
            statusCode: 500,
            body: {error: "Something Went Wrong!"},
            delay: 2000
        }).as('fetchTrendingVideos');
        cy.wait('@fetchTrendingVideos');
        cy.get('[data-testid="layout"] [data-testid="trending-container"]').within(() => {
            cy.get('[data-testid="failure-container"]').within(() => {
                cy.contains("Failed to fetch data");
                cy.get('button').contains("Retry").should('be.visible');
            });
        });
    });

});
