describe("Video Item Details", () => {

    beforeEach(() => {
        cy.login("rahul", "rahul@2021")
        cy.visit("http://localhost:3000/");
    });

    it("should display the loader while fetching videos", () => {
        cy.getByDataTestId("homeIcon").click();
        cy.url().should("include", "/");    
        cy.getByDataTestId("home-success-view").within(() => {
            cy.get('li').first().click()
        })

        cy.url().should("eq", 'http://localhost:3000/videos/30b642bd-7591-49f4-ac30-5c538f975b15')
    })

    it("clicks the like and dislike buttons", () => {
        cy.getByDataTestId("homeIcon").click();
        cy.url().should("include", "/");    
        cy.getByDataTestId("home-success-view").within(() => {
            cy.get('li').first().click()
        })
        cy.getByDataTestId("likeButton").click()
        cy.getByDataTestId("dislikeButton").click()
    })

    it("clicks the save button", () => {
        cy.getByDataTestId("homeIcon").click();
        cy.url().should("include", "/");    
        cy.getByDataTestId("home-success-view").within(() => {
            cy.get('li').first().click()
        })

        cy.getByDataTestId("saveButton").dblclick()
        cy.getByDataTestId("saveButton").should("contain.text", "Saved")

        cy.getByDataTestId("savedVideosIcon").click();
        cy.url().should("include", "/saved-videos");

        cy.getByDataTestId("saved-videos").within(() => {
            cy.contains("Sehwag shares his batting experience in iB Cricket | iB Cricket Super Over League")
        })
    })
})