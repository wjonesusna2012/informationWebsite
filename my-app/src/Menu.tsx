import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem  from '@mui/material/MenuItem';

interface MenuInterface {
  anchorElement: HTMLElement | null,
  open: boolean,
  closeHandler: () => void,
}
const NavMenu: React.FC<MenuInterface> = ({ open, anchorElement, closeHandler }) => (
  <Menu id="basic-menu" anchorEl={anchorElement} open={open} onClose={closeHandler}>
    <MenuItem>Test 1</MenuItem>
    <MenuItem>Test 2</MenuItem>
    <MenuItem>Test 3</MenuItem>
  </Menu>
);

export default NavMenu;

