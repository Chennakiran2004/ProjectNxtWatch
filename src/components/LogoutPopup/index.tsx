import React from "react";
import Popup from "reactjs-popup";
import { Button, LogoutPopupContent } from "./styledComponents";

type LogoutPopupProps = {
  onClickLogout: () => void;
  theme: string;
};

const LogoutPopup: React.FC<LogoutPopupProps> = ({ onClickLogout, theme }) => {
  const popupBody: any = (close: () => void) => {
    return (
      <LogoutPopupContent theme={theme}>
        <p>Are you sure, you want to logout?</p>
        <div>
          <Button
            type="button"
            data-testid="cancel"
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            color="black"
            type="button"
            data-testid="confirm"
            background-color="black"
            onClick={() => {
              onClickLogout();
              close();
            }}
          >
            Confirm
          </Button>
        </div>
      </LogoutPopupContent>
    );
  };

  return (
    <Popup
      trigger={
        <Button data-testid="Logout" type="button">
          Logout
        </Button>
      }
      modal
      className="logout-popup"
    >
      {popupBody}
    </Popup>
  );
};

export default LogoutPopup;
