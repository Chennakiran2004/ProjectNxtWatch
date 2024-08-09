import '@testing-library/jest-dom';

import {screen, render, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import ThemeContext from "../../Context/ThemeContext";

import ActiveMenuContext from "../../Context/ActiveMenuContext";

import { activeMenuConstants } from "../../Context/activeMenuConstants";

import HomeBody from '../HomeBody'

const videoDetails = {
    thumbnailUrl: "http://example.com/thumbnail.jpg",
    channel: {
      name: "Channel Name",
      profileImageUrl: "http://example.com/profile.jpg",
    },
    viewCount: "1M",
    title: "Video Title",
    id: "123",
    publishedAt: new Date().toISOString(),
  };


const mockActiveMenu = jest.fn()

// const mockActiveMenu = (menu: "initial" | "home" | "trending" | "gaming" | "savedVideos") => {
//     // your implementation here
//   };

describe("HomeBody Component", () => {

    const renderComponent = (theme: string) => {
        return render(
            <ThemeContext.Provider value={{isDarkTheme: theme === 'dark', toggleTheme: () => {}}}>
                <ActiveMenuContext.Provider value={{
                    activeMenu: activeMenuConstants.initial,
                    changeActiveMenu: mockActiveMenu
                    }}>
                <BrowserRouter>
                    <HomeBody videoDetails={videoDetails}/>
                </BrowserRouter>
                </ActiveMenuContext.Provider>
            </ThemeContext.Provider>
        )
    }

    it("render video card details correctly", () => {
        renderComponent('dark')

        expect(screen.getByAltText("video thumbnail")).toHaveAttribute("src", videoDetails.thumbnailUrl);
        
        expect(screen.getByAltText("channel logo")).toHaveAttribute("src", videoDetails.channel.profileImageUrl);
        
        expect(screen.getByText(videoDetails.title)).toBeInTheDocument();
        
        expect(screen.getByText(videoDetails.channel.name)).toBeInTheDocument();
        
        expect(screen.getByText(`${videoDetails.viewCount} views`)).toBeInTheDocument();
        
        expect(screen.getByText(/ago$/)).toBeInTheDocument();
    })

    it("link is navigating to the correct url and it triggers changeActiveMenu", () => {
        renderComponent("light")

        const linkElement = screen.getByRole("link")

        fireEvent.click(linkElement)

        expect(mockActiveMenu).toHaveBeenCalledWith("initial")
    })

    it("applies correct theme to the video title", () => {
        renderComponent("dark")

        const videoTitle = screen.getByText(videoDetails.title)

        expect(videoTitle).toHaveStyle("color: rgb(255, 255, 255)")
    })
})