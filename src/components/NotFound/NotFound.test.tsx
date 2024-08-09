import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import ThemeContext from '../../Context/ThemeContext';

import { BrowserRouter } from 'react-router-dom';

import NotFound from '../NotFound';


import {
    darkThemeFailureImgUrl,
    lightThemeFailureImgUrl,
  } from "../../Constants/failureImageUrl";


describe("NotFound Component", () => {
    
    const renderComponent = (theme: boolean) => {
        return render(
            <ThemeContext.Provider value={{isDarkTheme: theme, toggleTheme: () => {}}}>
                <BrowserRouter>
                    <NotFound/>
                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }

    it('should render NotFound component', () => {
        renderComponent(false);
        const notFoundElement = screen.getByTestId('not-found-container');
        expect(notFoundElement).toBeInTheDocument();
    })

    it("should display the dark theme correctly", () => {
        renderComponent(true); 
    
        expect(screen.getByAltText("not found")).toHaveAttribute("src", darkThemeFailureImgUrl);
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        expect(screen.getByText("We are sorry, the page you requested could not be found.")).toBeInTheDocument();
      });
    
      it("should display the light theme correctly", () => {
        renderComponent(false); 
    
        expect(screen.getByAltText("not found")).toHaveAttribute("src", lightThemeFailureImgUrl);
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        expect(screen.getByText("We are sorry, the page you requested could not be found.")).toBeInTheDocument();
      });
    
})