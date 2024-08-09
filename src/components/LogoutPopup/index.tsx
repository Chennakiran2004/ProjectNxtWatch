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
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            color="white"
            type="button"
            data-testid="confirm"
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
      trigger={<Button data-testid="logout" type="button">Logout</Button>}
      modal
      className="logout-popup"
    >
      {popupBody}
    </Popup>
  );
};

export default LogoutPopup;
