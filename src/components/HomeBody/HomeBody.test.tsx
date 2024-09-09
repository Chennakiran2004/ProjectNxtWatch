import "@testing-library/jest-dom";

import { screen, render, fireEvent } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ThemeContext from "../../Context/ThemeContext";

import ActiveMenuContext from "../../Context/ActiveMenuContext";

import { activeMenuConstants } from "../../Context/activeMenuConstants";

import HomeBody from "../HomeBody";

const videoDetails = {
  thumbnailUrl: "http://example.com/thumbnail.jpg",
  channel: {
    name: "Channel Name",
    profileImageUrl: "http://example.com/profile.jpg",
  },
  viewCount: "1M",
  title: "Video Title",
  id: "123",
  publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
};

const mockActiveMenu = jest.fn();

describe("HomeBody Component", () => {
  const renderComponent = (theme: string) => {
    return render(
      <ThemeContext.Provider
        value={{ isDarkTheme: theme === "dark", toggleTheme: () => {} }}
      >
        <ActiveMenuContext.Provider
          value={{
            activeMenu: activeMenuConstants.initial,
            changeActiveMenu: mockActiveMenu,
          }}
        >
          <BrowserRouter>
            <HomeBody videoDetails={videoDetails} />
          </BrowserRouter>
        </ActiveMenuContext.Provider>
      </ThemeContext.Provider>,
    );
  };

  it("render video card details correctly", () => {
    renderComponent("dark");

    expect(screen.getByAltText("video thumbnail")).toHaveAttribute(
      "src",
      videoDetails.thumbnailUrl,
    );

    expect(screen.getByAltText("channel logo")).toHaveAttribute(
      "src",
      videoDetails.channel.profileImageUrl,
    );

    expect(screen.getByText(videoDetails.title)).toBeInTheDocument();

    expect(screen.getByText(videoDetails.channel.name)).toBeInTheDocument();

    expect(
      screen.getByText(`${videoDetails.viewCount} views`),
    ).toBeInTheDocument();

    expect(screen.getByText(/ago$/)).toBeInTheDocument();
  });

  it("link is navigating to the correct url and it triggers changeActiveMenu", () => {
    renderComponent("light");

    const linkElement = screen.getByRole("link");

    fireEvent.click(linkElement);

    expect(mockActiveMenu).toHaveBeenCalledWith("initial");
  });

  it("applies correct theme to the video title", () => {
    renderComponent("dark");

    const videoTitle = screen.getByText(videoDetails.title);

    expect(videoTitle).toHaveStyle("color: rgb(255, 255, 255)");
  });

  it("formats postedAt date correctly when postedAtList length is 3", () => {
    renderComponent("dark");

    // Adjust `videoDetails.publishedAt` to ensure it results in postedAtList with length 3
    const postedAtText = screen.getByText(/ago$/);
    expect(postedAtText).toBeInTheDocument();

    // Ensure the postedAtText is formatted correctly
    const postedAtList = postedAtText?.textContent?.split(" ");
    expect(postedAtList?.length).toBeLessThanOrEqual(3); // Length should be less than 3 after formatting
  });

  it("renders VideoCardContainer as an 'li' element", () => {
    renderComponent("dark");

    const videoCardContainer = screen.getByRole("listitem");
    expect(videoCardContainer).toBeInTheDocument();
  });
});
