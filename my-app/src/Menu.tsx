import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuInterface } from './interfaces';
import { Link } from 'react-router-dom';

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
    <MenuItem>
      <Link to='/narrative'>
        Create New Narrative
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to='/'>
        View Narratives
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to='/'>
        Share Narratives
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to='/story'>
        Create Story 
      </Link>
    </MenuItem>
  </Menu>
);

export default NavMenu;
