import React from "react";
import {
  ActiveMenu,
  activeMenuConstants,
} from "../Context/activeMenuConstants";

interface ActiveMenuContextType {
  activeMenu: ActiveMenu | string;
  changeActiveMenu: (menu: ActiveMenu) => void;
}

const ActiveMenuContext = React.createContext<ActiveMenuContextType>({
  activeMenu: activeMenuConstants.initial,
  changeActiveMenu: () => {},
});

export default ActiveMenuContext;
