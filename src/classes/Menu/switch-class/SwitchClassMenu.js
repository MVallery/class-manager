import React, { useState } from "react";
import ClassButtonList from "./ClassButtonList";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
const SwitchClassMenu = (props) => {
  const [mainDropdownDisplay, setMainDropdownDisplay] = useState(null);
  const handleMainMenuClick = (e) => {
    setMainDropdownDisplay(e.currentTarget);
  };
  const handleCloseMainMenu = () => {
    setMainDropdownDisplay(null);
  };
  return (
    <React.Fragment>
      <button className="switch-classes-button" onClick={handleMainMenuClick}>
        <span className="switch-classes-text">Classes</span>
      </button>
      <Menu
        id="simple-menu"
        anchorEl={mainDropdownDisplay}
        keepMounted
        open={Boolean(mainDropdownDisplay)}
        onClose={handleCloseMainMenu}
        getContentAnchorEl={null}
        disableScrollLock={true}
      >
        <ClassButtonList handleCloseMainMenu={handleCloseMainMenu} />
        <MenuItem
          onClick={() => {
            props.setAddNewClassModal(true);
            handleCloseMainMenu();
          }}
        >
          Add New Class
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default SwitchClassMenu;
