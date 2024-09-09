import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import MenuItemsList from "../MenuItemsList";

describe("MenuItemsList Component", () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <MenuItemsList />
      </BrowserRouter>,
    );
  };

  it("should render correctly", () => {
    renderComponent();
    expect(screen.getByTestId("menu-items-list")).toBeInTheDocument();
  });

  it("should render menu items", () => {
    renderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Trending")).toBeInTheDocument();
    expect(screen.getByText("Gaming")).toBeInTheDocument();
    expect(screen.getByText("Saved videos")).toBeInTheDocument();
  });

  it("should change active menu on click", () => {
    renderComponent();
    const homeLink = screen.getByText("Home");

    fireEvent.click(homeLink);
  });

  it("should change active menu item on click", () => {
    renderComponent();
    const homeLink = screen.getByText("Home");
    const trendingLink = screen.getByText("Trending");
    const GamingLink = screen.getByText("Gaming");
    const savedVideosLink = screen.getByText("Saved videos");

    fireEvent.click(homeLink);
    expect(homeLink.closest("li")).toHaveStyle(
      'background-color: rgb("66, 66, 66)',
    );

    fireEvent.click(trendingLink);
    expect(trendingLink.closest("li")).toHaveStyle(
      'background-color: rgb("66, 66, 66)',
    );

    fireEvent.click(GamingLink);
    expect(GamingLink.closest("li")).toHaveStyle(
      'background-color: rgb("66, 66, 66)',
    );

    fireEvent.click(savedVideosLink);
    expect(savedVideosLink.closest("li")).toHaveStyle(
      'background-color: rgb("66, 66, 66)',
    );
  });

  it("should display icons with correct color based on active state", () => {
    renderComponent();

    const homeIcon = screen.getByTestId("homeIcon");
    const trendingIcon = screen.getByTestId("trendingIcon");
    const gamingIcon = screen.getByTestId("gamingIcon");
    const savedVideosIcon = screen.getByTestId("savedVideosIcon");

    fireEvent.click(homeIcon);
    expect(homeIcon).toHaveStyle('backgroundColor: rgb("255, 11, 55")');

    fireEvent.click(trendingIcon);
    expect(trendingIcon).toHaveStyle('backgroundColor: rgb("255, 11, 55")');

    fireEvent.click(gamingIcon);
    expect(gamingIcon).toHaveStyle('backgroundColor: rgb("255, 11, 55")');

    fireEvent.click(savedVideosIcon);
    expect(savedVideosIcon).toHaveStyle('backgroundColor: rgb("255, 11, 55")');
  });
});
