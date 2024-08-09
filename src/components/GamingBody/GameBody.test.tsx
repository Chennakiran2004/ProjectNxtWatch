import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import GameBody from '../GamingBody'

import ThemeContext from '../../Context/ThemeContext';

import ActiveMenuContext from '../../Context/ActiveMenuContext';

import { BrowserRouter } from 'react-router-dom';

const gameDetails = {
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    viewCount: '1M',
    title: 'Sample Game',
    id: '1',
}


describe("Gaming Body Component", () => {

    const mockChangeActiveMenu = jest.fn()

    const renderComponent = (theme: string) => {
        return render(
            <ThemeContext.Provider value={{isDarkTheme: theme === "dark", toggleTheme: () => {} }}>
                <ActiveMenuContext.Provider value={{activeMenu: "home", changeActiveMenu: mockChangeActiveMenu}}>
                    <BrowserRouter>
                        <GameBody gameDetails={gameDetails} />
                    </BrowserRouter>
                </ActiveMenuContext.Provider>
            </ThemeContext.Provider>
        )
    }

    it("should render the game body correctly", () => {
        renderComponent("light")
        const gameBody = screen.getByTestId("game-body-details")

        expect(gameBody).toBeInTheDocument()
    })

    it("Should render gaming card details correctly", () => {
        renderComponent("dark")

        const thumbnail = screen.getByAltText('video thumbnail');
        expect(thumbnail).toHaveAttribute('src', gameDetails.thumbnailUrl);
        
        expect(screen.getByText(gameDetails.title)).toBeInTheDocument()

        expect(screen.getByText(`${gameDetails.viewCount} Watching Worldwide`)).toBeInTheDocument()
    })

    it("link is navigating to the correct url when it triggers changeActiveMenu", () => {
        renderComponent("dark")

        const linkElement = screen.getByRole("link")

        fireEvent.click(linkElement)

        expect(mockChangeActiveMenu).toHaveBeenCalledWith("initial")
    })

    it("applies correct theme to the title", () => {
        renderComponent('dark')

        const videoTitle = screen.getByText(gameDetails.title)

        expect(videoTitle).toHaveStyle('color: #ffffff')
    })

    it("applies correct theme to the title in light mode", () => {
        renderComponent('light')

        const videoTitle = screen.getByText(gameDetails.title)

        expect(videoTitle).toHaveStyle('color: #0f0f0f')
    })
})