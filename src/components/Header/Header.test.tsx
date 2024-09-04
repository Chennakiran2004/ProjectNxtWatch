import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter, useNavigate } from 'react-router-dom';

import Header from '../Header';

import ThemeContext from '../../Context/ThemeContext';

import ActiveMenuContext from '../../Context/ActiveMenuContext';

describe("Header Component", () => {
    const mockToggleTheme = jest.fn();
    const mockChangeActiveMenu = jest.fn();
    const mockActiveMenu = "home";

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
    }))

    
    const mockNavigate = jest.fn()

    const renderComponent = (isDarkTheme: boolean) => {
        render(
            <BrowserRouter>
                <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: mockToggleTheme }}>
                    <ActiveMenuContext.Provider value={{ activeMenu: mockActiveMenu, changeActiveMenu: mockChangeActiveMenu }}>
                        <Header />
                    </ActiveMenuContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        );
    };

    it("should render Header component", () => {
        renderComponent(false);
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
    });

    it("should render correctly in dark theme", () => {
        renderComponent(true);
        const websiteLogo = screen.getByTestId("website logo");
        const profileIcon = screen.getByAltText("profile");
        const themeButton = screen.getAllByTestId("desktop-theme")[0];

        expect(websiteLogo).toBeInTheDocument();
        expect(profileIcon).toBeInTheDocument();
        expect(themeButton).toBeInTheDocument();
    });

    it("should render correctly in light theme", () => {
        renderComponent(false);
        const websiteLogo = screen.getByTestId("website logo");
        const profileIcon = screen.getByAltText("profile");
        const themeButton = screen.getAllByTestId("desktop-theme")[0];

        expect(websiteLogo).toBeInTheDocument();
        expect(profileIcon).toBeInTheDocument();
        expect(themeButton).toBeInTheDocument();
    });

    it("toggles theme when theme button is clicked", () => {
        renderComponent(false);
        const themeButton = screen.getAllByTestId("desktop-theme")[0];

        fireEvent.click(themeButton);
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it("toggles theme when theme button is clicked", () => {
        renderComponent(false);
        const themeButton = screen.getAllByTestId("desktop-theme")[0];

        fireEvent.click(themeButton);
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});
