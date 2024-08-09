import React, { useContext } from "react";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ActiveMenuContext from "../../Context/ActiveMenuContext";
import ThemeContext from "../../Context/ThemeContext";
import { removeCookie } from "../../Constants/storageUtilities";
import {
  NavMobileContainer,
  HeaderLogoImg,
  NavMobileIcons,
  IconButton,
  NavLargeContainer,
  ProfileIcon,
  NavLargeIcons,
} from "./styledComponents";
import LogoutPopup from "../LogoutPopup";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { changeActiveMenu } = useContext(ActiveMenuContext);


  const onClickLogout = () => {
    removeCookie();
    navigate("/login");
  };

  const renderLogo = (theme: string) => (
    <Link to="/">
      <HeaderLogoImg
        src={
          theme === "dark"
            ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        }
        alt="website logo"
        onClick={() => changeActiveMenu("home")}
      />
    </Link>
  );

  const theme = isDarkTheme ? "dark" : "light";
  const color = isDarkTheme ? "white" : "black";

  return (
    <div data-testid="header">
      <NavMobileContainer theme={theme}>
        {renderLogo(theme)}
        <NavMobileIcons>
          <IconButton type="button" data-testid="theme" onClick={toggleTheme}>
            {isDarkTheme ? (
              <FiSun color="white" size={22} />
            ) : (
              <FaMoon size={22} />
            )}
          </IconButton>

          <LogoutPopup onClickLogout={onClickLogout} theme={theme} />
        </NavMobileIcons>
      </NavMobileContainer>
      <NavLargeContainer theme={theme}>
        <Link to="/">
          <HeaderLogoImg
            src={
              isDarkTheme
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            }
            alt="website logo"
            data-testid="website logo"
            onClick={() => changeActiveMenu("home")}
          />
        </Link>
        <NavLargeIcons>
          <IconButton data-testid="theme" type="button" onClick={toggleTheme}>
            {isDarkTheme ? (
              <FiSun color="white" size={23} />
            ) : (
              <FaMoon size={23} />
            )}
          </IconButton>
          <ProfileIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <LogoutPopup onClickLogout={onClickLogout} theme={theme} />
        </NavLargeIcons>
      </NavLargeContainer>
    </div>
  );
};

export default Header;
