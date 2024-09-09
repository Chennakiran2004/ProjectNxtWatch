import { Provider } from "react-redux";
import store from "./storeFolder/store";
import App from "./App";
import { render } from "@testing-library/react";

describe("index", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(container).toBeTruthy();
  });
});
