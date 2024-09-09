// VideoItemDetails.test.tsx
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import VideoItemDetails from ".";
import { render, screen } from "@testing-library/react";
import store from "../../storeFolder/store";
import { MemoryRouter } from "react-router-dom";
import ThemeContext from "../../Context/ThemeContext";

const renderWithTheme = (theme: "light" | "dark") => {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ isDarkTheme: theme === "dark", toggleTheme: () => {} }}
        >
          <VideoItemDetails />
        </ThemeContext.Provider>
      </Provider>
    </MemoryRouter>,
  );
};

describe("VideoItemDetails Component", () => {
  it("should render component correctly", () => {
    renderWithTheme("light");

    expect(screen.getByTestId("videoItemDetails")).toBeInTheDocument();
  });

  it("should render component with light theme", () => {
    renderWithTheme("light");
    expect(screen.getByTestId("videoItemDetails")).toBeInTheDocument();
  });

  it("should render component with dark theme", () => {
    renderWithTheme("dark");
    expect(screen.getByTestId("videoItemDetails")).toBeInTheDocument();
  });
});
