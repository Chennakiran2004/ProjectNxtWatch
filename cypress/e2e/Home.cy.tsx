describe("Home", () => {
    beforeEach(() => {
        cy.login("rahul", "rahul@2021")
        cy.visit("http://localhost:3000/");
    });

    it('should display the loader while fetching videos', () => {
        cy.intercept('GET', '**/videos/all*', { delay: 2000, fixture: 'videos.json' }).as('fetchVideos');
        cy.get('[data-testid="loader"]').should('be.visible');
        cy.wait('@fetchVideos');
        cy.get('[data-testid="loader"]').should('not.exist');
    });


    it('displays videos after successfully fetching them', () => {
        cy.intercept('GET', '**/videos/all*', { fixture: 'videos.json' }).as('fetchVideos');

        cy.wait('@fetchVideos')

        cy.get('[data-testid="layout"] [data-testid="Home container"]').within(() => {
            cy.get('li').should("have.length", 2)
            cy.contains("Mock Video 1")
        })
    })

    it("handles search input and displays results", () => {
        cy.intercept('GET', '**/videos/all*', { fixture: 'videos.json' }).as('fetchVideos');

        cy.getByDataTestId("searchInput").type("Mock Video 1")
        cy.getByDataTestId("searchButton").click()

        cy.wait('@fetchVideos')

        cy.get('[data-testid="layout"] [data-testid="Home container"]').within(() => {
            cy.get('li').should("have.length", 2)
            cy.contains("Mock Video 1")
        })
    })


    it("handles search input and displays results", () => {
        cy.intercept('GET', '**/videos/all*', {videos: []}).as('fetchVideos');

        cy.getByDataTestId("searchInput").type("No videos exist")
        cy.getByDataTestId("searchButton").click()

        cy.wait('@fetchVideos')

        cy.getByDataTestId("no-vieos-view-container").should('exist')
        cy.contains('No search results found').should('exist')
    })

    it('closes the premium banner when close button is clicked', () => {
        cy.get('[data-testid="banner"]').should('exist');
        cy.get('[data-testid="close"]').click();
        cy.get('[data-testid="banner"]').should('not.exist');
      });
})