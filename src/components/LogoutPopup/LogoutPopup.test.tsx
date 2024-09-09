import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogoutPopup from "../LogoutPopup";
import { Button } from "./styledComponents";

const mockOnClickLogout = jest.fn();
const mockTheme = "dark";

describe("LogoutPopup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Logout button", () => {
    render(<LogoutPopup onClickLogout={mockOnClickLogout} theme={mockTheme} />);

    const logoutButton = screen.getByTestId("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  it("should open the popup when the Logout button is clicked", () => {
    render(<LogoutPopup onClickLogout={mockOnClickLogout} theme={mockTheme} />);

    const logoutButton = screen.getByTestId("Logout");
    fireEvent.click(logoutButton);

    const popupText = screen.getByText(/Are you sure, you want to logout?/i);
    expect(popupText).toBeInTheDocument();
  });

  it("should close the popup when the Cancel button is clicked", () => {
    render(<LogoutPopup onClickLogout={mockOnClickLogout} theme={mockTheme} />);

    const logoutButton = screen.getByTestId("Logout");
    fireEvent.click(logoutButton);

    const cancelButton = screen.getByTestId("cancel");
    fireEvent.click(cancelButton);

    const popupText = screen.queryByText(/Are you sure, you want to logout?/i);
    expect(popupText).not.toBeInTheDocument();
  });

  it("should call onClickLogout and close the popup when the Confirm button is clicked", () => {
    render(<LogoutPopup onClickLogout={mockOnClickLogout} theme={mockTheme} />);

    const logoutButton = screen.getByTestId("Logout");
    fireEvent.click(logoutButton);

    const confirmButton = screen.getByTestId("confirm");
    fireEvent.click(confirmButton);

    expect(mockOnClickLogout).toHaveBeenCalled();

    const popupText = screen.queryByText(/Are you sure, you want to logout?/i);
    expect(popupText).not.toBeInTheDocument();
  });

  it("should apply correct styles based on props in Button component", () => {
    const { container } = render(
      <Button color="red" outline={true}>
        Test Button
      </Button>,
    );

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveStyle(`background-color: transparent`);
    expect(buttonElement).toHaveStyle(`border: 2px solid red`);
    expect(buttonElement).toHaveStyle(`color: red`);

    // Test non-outlined button
    const { container: nonOutlinedContainer } = render(
      <Button color="green">Test Button</Button>,
    );
    const nonOutlinedButtonElement =
      nonOutlinedContainer.querySelector("button");
    expect(nonOutlinedButtonElement).toHaveStyle(`background-color: green`);
    expect(nonOutlinedButtonElement).toHaveStyle(`border: none`);
    expect(nonOutlinedButtonElement).toHaveStyle(`color: white`);
  });

  it("should display popup with correct styles based on theme", () => {
    const { getByText } = render(
      <LogoutPopup onClickLogout={mockOnClickLogout} theme="light" />,
    );

    const logoutButton = screen.getByTestId("Logout");
    fireEvent.click(logoutButton);

    const popupContent = screen
      .getByText(/Are you sure, you want to logout?/i)
      .closest("div");
    expect(popupContent).toHaveStyle(`background-color: #fff`);
    expect(popupContent).toHaveStyle(`color: #333`);
  });
});
