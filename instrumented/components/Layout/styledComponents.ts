import styled from "styled-components";

export const LayoutContainer = styled.div<{ theme: string }>`
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#f9f9f9")};
  color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#333")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainBody = styled.div`
  display: flex;
  flex: 1;
`;

export const SidebarContainer = styled.div``;

export const ContentContainer = styled.div`
  flex: 1;
`;
