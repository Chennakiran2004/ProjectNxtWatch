import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { IoLogoGameControllerB } from "react-icons/io";
import { RiMenuAddLine } from "react-icons/ri";
import ActiveMenuContext from "../../Context/ActiveMenuContext";
import ThemeContext from "../../Context/ThemeContext";
import { MenuList, MenuLink, MenuHeading } from "./styledComponents";

import {
  activeMenuConstants,
  ActiveMenu,
} from "../../Context/activeMenuConstants";

const MenuItemsList: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { activeMenu, changeActiveMenu } = useContext(ActiveMenuContext);
  const theme = isDarkTheme ? "dark" : "light";

  const handleMenuClick = (menuKey: ActiveMenu) => {
    changeActiveMenu(menuKey);
  };

  const iconColor = isDarkTheme ? "#424242" : "#7e858e";
  const iconActive = "#ff0b37";

  return (
    <MenuList data-testid="menu-items-list">
      <Link to="/" className="link">
        <MenuLink
          theme={theme}
          $isActive={activeMenu === activeMenuConstants.home}
          onClick={() => handleMenuClick(activeMenuConstants.home)}
          key="HOME"
        >
          <AiFillHome
            size={25}
            data-testid="homeIcon"
            color={
              activeMenu === activeMenuConstants.home ? iconActive : iconColor
            }
          />
          <MenuHeading theme={theme}>Home</MenuHeading>
        </MenuLink>
      </Link>
      <Link to="/trending" className="link">
        <MenuLink
          theme={theme}
          $isActive={activeMenu === activeMenuConstants.trending}
          onClick={() => handleMenuClick(activeMenuConstants.trending)}
          key="TRENDING"
        >
          <AiFillFire
            size={25}
            data-testid="trendingIcon"
            color={
              activeMenu === activeMenuConstants.trending
                ? iconActive
                : iconColor
            }
          />
          <MenuHeading theme={theme}>Trending</MenuHeading>
        </MenuLink>
      </Link>
      <Link to="/gaming" className="link">
        <MenuLink
          theme={theme}
          $isActive={activeMenu === activeMenuConstants.gaming}
          onClick={() => handleMenuClick(activeMenuConstants.gaming)}
          key="GAMING"
        >
          <IoLogoGameControllerB
            size={25}
            data-testid="gamingIcon"
            color={
              activeMenu === activeMenuConstants.gaming ? iconActive : iconColor
            }
          />
          <MenuHeading theme={theme}>Gaming</MenuHeading>
        </MenuLink>
      </Link>
      <Link to="/saved-videos" className="link">
        <MenuLink
          theme={theme}
          $isActive={activeMenu === activeMenuConstants.savedVideos}
          onClick={() => handleMenuClick(activeMenuConstants.savedVideos)}
          key="SAVED_VIDEOS"
        >
          <RiMenuAddLine
            size={25}
            data-testid="savedVideosIcon"
            color={
              activeMenu === activeMenuConstants.savedVideos
                ? iconActive
                : iconColor
            }
          />
          <MenuHeading theme={theme}>Saved videos</MenuHeading>
        </MenuLink>
      </Link>
    </MenuList>
  );
};

export default MenuItemsList;
