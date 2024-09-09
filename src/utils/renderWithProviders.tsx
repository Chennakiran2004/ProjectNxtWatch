import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../storeFolder/store";
import ThemeContext from "../Context/ThemeContext";
import { MemoryRouter } from "react-router-dom";

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: any;
  store?: any;
  themeContext?: { isDarkTheme: boolean; toggleTheme: () => {} };
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const themeContextValue = {
    isDarkTheme: false,
    toggleTheme: () => {},
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    try {
      return (
        <Provider store={store}>
          <MemoryRouter>
            <ThemeContext.Provider value={themeContextValue}>
              {children}
            </ThemeContext.Provider>
          </MemoryRouter>
        </Provider>
      );
    } catch (error) {
      throw error;
    }
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export default renderWithProviders;
