describe("MenuItemsList", () => {
    beforeEach(() => {
      cy.login("rahul", "rahul@2021")
      cy.visit("http://localhost:3000/");
    });
  
    it("should navigate to the Home page when the Home icon is clicked", () => {
      cy.getByDataTestId("homeIcon").click();
      cy.url().should("include", "/");
    });
  
    it("should navigate to the Trending page when the Trending icon is clicked", () => {
      cy.getByDataTestId("trendingIcon").click();
      cy.url().should("include", "/trending");

    });
  
    it("should navigate to the Gaming page when the Gaming icon is clicked", () => {
      cy.getByDataTestId("gamingIcon").click();
      cy.url().should("include", "/gaming");
   
    });
  
    it("should navigate to the Saved Videos page when the Saved Videos icon is clicked", () => {
      cy.getByDataTestId("savedVideosIcon").click();
      cy.url().should("include", "/saved-videos");
    });


    it('should display the sidebar with correct elements', () => {
        cy.getByDataTestId('sidebar').should('be.visible');
        cy.getByDataTestId('menu-items-list').should('be.visible');
        cy.getByDataTestId("sidebar").within(() => {
          cy.contains('Home').should('be.visible');
          cy.contains('Trending').should('be.visible');
          cy.contains('Gaming').should('be.visible');
          cy.contains('Saved videos').should('be.visible');
          cy.contains('CONTACT US').should('be.visible');
          cy.get('img[alt="twitter logo"]').should('be.visible');
          cy.get('img[alt="facebook logo"]').should('be.visible');
          cy.get('img[alt="linkedin logo"]').should('be.visible');
          cy.contains('Enjoy! Now to see your channels and recommendations!').should('be.visible');
        });
    });


    it("should apply darktheme and lightheme when button is clicked in mobile", () => {
        cy.viewport("iphone-6")

        cy.getByDataTestId("mobile-theme").click();
        cy.getByDataTestId("sidebar").should('have.css', 'background-color', 'rgb(33, 33, 33)');


        cy.getByDataTestId("mobile-theme").click();
        cy.getByDataTestId("sidebar").should('have.css', 'background-color', 'rgb(244, 244, 244)');
    })


    it("should apply darktheme and lighttheme when button is clicked in desktop", () => {
        cy.getByDataTestId("desktop-theme").click();
        cy.getByDataTestId("sidebar").should('have.css', 'background-color', 'rgb(33, 33, 33)');


        cy.getByDataTestId("desktop-theme").click();
        cy.getByDataTestId("sidebar").should('have.css', 'background-color', 'rgb(244, 244, 244)');
    })

  
  });
  