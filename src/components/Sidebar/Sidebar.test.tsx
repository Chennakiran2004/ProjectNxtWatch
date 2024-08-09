import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Sidebar from '../Sidebar';

import { BrowserRouter } from 'react-router-dom';

import { ThemeContext } from 'styled-components';


describe("Sidebar component", () => {


    const renderComponent = (isDarkTheme: boolean) => {
        render(
          <BrowserRouter>
            <ThemeContext.Provider value={{isDarkTheme}}>
              <Sidebar />
            </ThemeContext.Provider>
          </BrowserRouter>
        );
    }


  it("should render the text", () => {

    renderComponent(false);
    
    const contactUs = screen.getByText("CONTACT US");
    
    const paragraphElement = screen.getByText("Enjoy! Now to see your channels and recommendations!")
    
    expect(contactUs).toBeInTheDocument();
    
    expect(paragraphElement).toBeInTheDocument()

  });



  it("Should display social media icons", () => {

    renderComponent(false);

    const twitterLogo = screen.getByAltText("twitter logo")
    const facebookLogo = screen.getByAltText("facebook logo")
    const linkedinLogo = screen.getByAltText("linkedin logo")

    expect(twitterLogo).toBeInTheDocument()
    
    expect(facebookLogo).toBeInTheDocument()
    
    expect(linkedinLogo).toBeInTheDocument()

  })


  it("should render with light theme", () => {

    renderComponent(false);

    const sidebar = screen.getByTestId("sidebar")

    expect(sidebar).toBeInTheDocument()

    expect(sidebar).toHaveStyle({ backgroundColor: "#f4f4f4" })

  })

  
  it("should render with dark theme", () => {
    renderComponent(true);

    const sidebar = screen.getByTestId("sidebar");
    
    expect(sidebar).toBeInTheDocument();
   
    expect(sidebar).toHaveStyle({ backgroundColor: "rgb(244, 244, 244)" }); 

  })
});
