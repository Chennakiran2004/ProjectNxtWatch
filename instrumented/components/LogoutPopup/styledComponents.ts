import styled from "styled-components";

type ThemeProps = {
  theme: string;
};

export const LogoutPopupContent = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  p {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`;

type ButtonProps = {
  color?: string;
  outline?: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ color, outline }) =>
    outline ? "transparent" : color || "blue"};
  color: ${({ color, outline }) => (outline ? color || "blue" : "white")};
  border: ${({ outline, color }) =>
    outline ? `2px solid ${color || "blue"}` : "none"};
  font-size: 16px;
  transition: background-color 0.3s;
`;
