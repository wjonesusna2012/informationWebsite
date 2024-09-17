import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddNarrativeIcon from '@mui/icons-material/LibraryAdd';
import Menu from './Menu';
import AddMenu from './AddMenu';
const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openAdd = Boolean(addAnchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddClose = () => {
    setAddAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ mr: 2 }}
            onClick={handleAddClick}
          >
            <AddNarrativeIcon />
          </IconButton>
          <Menu
            anchorElement={anchorEl}
            closeHandler={handleAddClose}
            open={open}
          />
          <AddMenu
            anchorElement={addAnchorEl}
            closeHandler={handleClose}
            open={openAdd}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Narratives
          </Typography>
          <Autocomplete
            freeSolo
            disablePortal
            multiple
            id="combo-box-demo"
            options={['Abracadabra', 'Banana', 'Celsius', 'Elephant']}
            sx={{ width: 300, padding: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Topics"
                placeholder="Filter Topics"
              />
            )}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationMenu;
