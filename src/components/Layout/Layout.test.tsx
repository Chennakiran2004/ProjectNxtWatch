import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import Layout from "../Layout";

import ThemeContext from "../../Context/ThemeContext";
import { BrowserRouter } from 'react-router-dom';

describe("Layout Component", () => {

    const renderWithTheme = (isDarkTheme: boolean) => {
        return render(
            <ThemeContext.Provider value={{ isDarkTheme: false, toggleTheme: () => {} }}>
                <BrowserRouter>
                    <Layout>
                        <div>test</div>
                    </Layout>
                </BrowserRouter>
            </ThemeContext.Provider>
        );
    }

    it("should render correctly", () => {
        renderWithTheme(false);
        expect(screen.getByTestId("layout")).toBeInTheDocument();
    });

    it("should render children", () => {
        renderWithTheme(false);
        expect(screen.getByText("test")).toBeInTheDocument();
    })

    it("should render correctly in dark theme", () => {
        renderWithTheme(true);
        expect(screen.getByTestId("layout")).toBeInTheDocument();
    })

    it("should render correctly in light theme", () => {
        renderWithTheme(false);
        expect(screen.getByTestId("layout")).toBeInTheDocument();
    })

    it("should render correctly with light theme", () => {
        renderWithTheme(false);

        const layout = screen.getByTestId("layout");
        expect(layout).toBeInTheDocument();
        expect(layout).toHaveStyle('background-color: #f9f9f9'); 
        expect(layout).toHaveStyle('color: #333');

        const header = screen.getByTestId('header'); 
        expect(header).toBeInTheDocument();

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();

        
    });


    it("should render correctly with dark theme", () => {
        renderWithTheme(true);

        const layout = screen.getByTestId("layout");
        expect(layout).toBeInTheDocument();
        
        expect(layout).toHaveStyle('background-color: #f9f9f9'); 
        expect(layout).toHaveStyle('color: #333'); 

        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();

       
    });
       
})

