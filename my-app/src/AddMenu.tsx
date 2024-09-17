import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuInterface } from './interfaces';
import { Link } from 'react-router-dom';

const AddMenu: React.FC<MenuInterface> = ({
  open,
  anchorElement,
  closeHandler
}) => (
  <Menu
    id="basic-menu"
    anchorEl={anchorElement}
    open={open}
    onClose={closeHandler}
    variant='menu'
  >
    <MenuItem>
      <Link to='/narratives'>
        Create Narrative
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to='/stories'>
        Create Story 
      </Link>
    </MenuItem>
  </Menu>
);

export default AddMenu;
