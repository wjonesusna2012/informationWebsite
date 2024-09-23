import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuInterface } from '../interfaces';
import { ActionTypes, DialogDispatchContext } from '../App';

const AddMenu: React.FC<MenuInterface> = ({
  open,
  anchorElement,
  closeHandler
}) => {
  const dispatch = React.useContext(DialogDispatchContext);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorElement}
      open={open}
      onClose={closeHandler}
      variant="menu"
    >
      <MenuItem
        onClick={() => {
          dispatch!(ActionTypes.OPEN_NARRATIVE);
          closeHandler();
        }}
      >
        Create Narrative
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch!(ActionTypes.OPEN_STORY);
          closeHandler();
        }}
      >
        Create Story
      </MenuItem>
    </Menu>
  );
};

export default AddMenu;
