import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import SavedVideos from "../SavedVideos";
import ThemeContext from "../../Context/ThemeContext";
import SavedVideosContext from "../../Context/SavedVideosContext";
import { MemoryRouter } from "react-router-dom";
import { VideoDetails } from "../../ReduxFolder/VideoDetailsSlice";

const mockSavedVideo: VideoDetails = {
  id: "1",
  title: "Test Video 1",
  thumbnailUrl: "url1",
  channel: {
    name: "Test Channel 1",
    profileImageUrl: "url2",
    subscriberCount: 100,
  },
  description: "Test description",
  publishedAt: "2022-01-01T00:00:00Z",
  videoUrl: "https://example.com/video.mp4",
  viewCount: 1000,
};

const renderComponent = (
  savedVideosList: VideoDetails[],
  isDarkTheme: boolean,
) => {
  const value = {
    isDarkTheme,
    toggleTheme: () => {},
    save: false,
    savedVideosList,
    addVideosToSavedVideos: (video: VideoDetails) => {},
    deleteVideosFromSavedVideos: (video: VideoDetails) => {},
    updateSave: (video: VideoDetails) => {},
  };

  return render(
    <ThemeContext.Provider value={value}>
      <SavedVideosContext.Provider value={value}>
        <MemoryRouter>
          <SavedVideos />
        </MemoryRouter>
      </SavedVideosContext.Provider>
    </ThemeContext.Provider>,
  );
};

describe("SavedVideos Component", () => {
  it("should render no saved videos message when saved videos list is empty", () => {
    renderComponent([], false);

    expect(screen.getByText("Saved Videos")).toBeInTheDocument();
    expect(screen.getByAltText("no saved videos")).toBeInTheDocument();
  });

  it("should render the saved video when the list contains one video", () => {
    renderComponent([mockSavedVideo], false);

    expect(screen.getByText("Saved Videos")).toBeInTheDocument();
    expect(screen.getByText("Test Video 1")).toBeInTheDocument();
    expect(screen.getByText("Test Channel 1")).toBeInTheDocument();
  });

  it("should toggle between light and dark theme", () => {
    const { rerender } = renderComponent([mockSavedVideo], false);

    let menuHeading = screen.getByText("Saved Videos");
    expect(menuHeading).toHaveStyle("color: #0f0f0f");

    rerender(
      <ThemeContext.Provider
        value={{ isDarkTheme: true, toggleTheme: () => {} }}
      >
        <SavedVideosContext.Provider
          value={{
            save: false,
            savedVideosList: [mockSavedVideo],
            addVideosToSavedVideos: () => {},
            deleteVideosFromSavedVideos: () => {},
            updateSave: () => {},
          }}
        >
          <MemoryRouter>
            <SavedVideos />
          </MemoryRouter>
        </SavedVideosContext.Provider>
      </ThemeContext.Provider>,
    );

    menuHeading = screen.getByText("Saved Videos");
    expect(menuHeading).toHaveStyle("color: #f9f9f9");
  });
});
