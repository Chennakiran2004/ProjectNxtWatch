import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Login from "../Login";

import fetchApi from "../../Constants/fetchUtilities";

import { setCookie, getCookie } from "../../Constants/storageUtilities";

jest.mock("../../Constants/fetchUtilities", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../Constants/storageUtilities", () => ({
  __esModule: true,
  setCookie: jest.fn(),
  getCookie: jest.fn(() => undefined),
}));

describe("Login Component", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  };

  it("should render Login Component", () => {
    renderComponent();

    expect(screen.getByTestId("Login container")).toBeInTheDocument();
  });

  it("updates username and password", () => {
    renderComponent();

    const userName = screen.getByPlaceholderText(
      "Username",
    ) as HTMLInputElement;
    const password = screen.getByPlaceholderText(
      "Password",
    ) as HTMLInputElement;

    fireEvent.change(userName, { target: { value: "user" } });
    fireEvent.change(password, { target: { value: "pass" } });

    expect(userName).toHaveValue("user");
    expect(password).toHaveValue("pass");

    expect(userName.value).toBe("user");
    expect(password.value).toBe("pass");
  });

  it("shows password when checkbox is clicked", () => {
    renderComponent();

    const password = screen.getByTestId("password");
    const showPassword = screen.getByTestId("showPassword");

    fireEvent.click(showPassword);

    expect(password).toHaveAttribute("type", "text");
  });

  it("hides password when checkbox is clicked", () => {
    renderComponent();

    const password = screen.getByTestId("password");
    const showPassword = screen.getByTestId("showPassword");

    fireEvent.click(showPassword);

    fireEvent.click(showPassword);

    expect(password).toHaveAttribute("type", "password");
  });

  it("should handle successful login", async () => {
    (fetchApi as jest.Mock).mockResolvedValue({
      success: true,
      data: { jwt_token: "dummy_token" },
    });

    renderComponent();

    const userName = screen.getByPlaceholderText(
      "Username",
    ) as HTMLInputElement;
    const password = screen.getByPlaceholderText(
      "Password",
    ) as HTMLInputElement;
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(userName, { target: { value: "user" } });
    fireEvent.change(password, { target: { value: "pass" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith("jwt_token", "dummy_token", {
        expires: 30,
      });
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should handle login failure", async () => {
    (fetchApi as jest.Mock).mockResolvedValue({
      success: false,
      data: { error_msg: "Invalid credentials" },
    });

    renderComponent();

    const userName = screen.getByPlaceholderText(
      "Username",
    ) as HTMLInputElement;
    const password = screen.getByPlaceholderText(
      "Password",
    ) as HTMLInputElement;
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(userName, { target: { value: "user" } });
    fireEvent.change(password, { target: { value: "pass" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("should redirect if already logged in", () => {
    (getCookie as jest.Mock).mockReturnValue("dummy_token");

    renderComponent();

    expect(screen.queryByText("Username")).toBeNull();
    expect(screen.queryByText("Password")).toBeNull();
    expect(screen.queryByRole("button", { name: "login" })).toBeNull();
  });
});
