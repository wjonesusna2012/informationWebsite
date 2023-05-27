import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuInterface } from './interfaces';

const NavMenu: React.FC<MenuInterface> = ({
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
    <MenuItem>Create New Narrative</MenuItem>
    <MenuItem>View All Narratives</MenuItem>
    <MenuItem>Share Your Narrative</MenuItem>
  </Menu>
);

export default NavMenu;
