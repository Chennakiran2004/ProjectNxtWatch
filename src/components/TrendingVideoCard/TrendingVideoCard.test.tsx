import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import TrendingVideoCard from "../TrendingVideoCard";
import ThemeContext from "../../Context/ThemeContext";
import ActiveMenuContext from "../../Context/ActiveMenuContext";
import { MemoryRouter } from "react-router-dom";

const mockVideoDetails = {
  thumbnailUrl: "https://example.com/thumbnail1.jpg",
  channel: {
    name: "Channel 1",
    profileImageUrl: "https://example.com/profile1.jpg",
  },
  viewCount: "1K",
  title: "Video Title",
  id: "1",
  publishedAt: "2024-08-01T00:00:00Z",
};

const mockChangeActiveMenu = jest.fn();

const renderWithContext = (theme: boolean) => {
  const themeContextValue = {
    isDarkTheme: theme,
    toggleTheme: jest.fn(),
  };

  const activeMenuContextValue = {
    activeMenu: "trending",
    changeActiveMenu: mockChangeActiveMenu,
  };

  return render(
    <ThemeContext.Provider value={themeContextValue}>
      <ActiveMenuContext.Provider value={activeMenuContextValue}>
        <MemoryRouter>
          <TrendingVideoCard videoDetails={mockVideoDetails} />
        </MemoryRouter>
      </ActiveMenuContext.Provider>
    </ThemeContext.Provider>,
  );
};

describe("TrendingVideoCard Component", () => {
  it("should render the video card correctly", () => {
    renderWithContext(false);

    expect(screen.getByAltText("video thumbnail")).toBeInTheDocument();
    expect(screen.getByAltText("channel logo")).toBeInTheDocument();
    expect(screen.getByText("Video Title")).toBeInTheDocument();
    expect(screen.getByText("Channel 1")).toBeInTheDocument();
    expect(screen.getByText("1K views")).toBeInTheDocument();
  });

  it("should render the video card correctly in dark theme", () => {
    renderWithContext(true);

    expect(screen.getByAltText("video thumbnail")).toBeInTheDocument();
    expect(screen.getByAltText("channel logo")).toBeInTheDocument();
    expect(screen.getByText("Video Title")).toBeInTheDocument();
    expect(screen.getByText("Channel 1")).toBeInTheDocument();
    expect(screen.getByText("1K views")).toBeInTheDocument();
  });

  it('should call changeActiveMenu with "initial" when the card is clicked', () => {
    renderWithContext(false);

    const linkElement = screen.getByRole("link");
    linkElement.click();

    expect(mockChangeActiveMenu).toHaveBeenCalledWith("initial");
  });
});
