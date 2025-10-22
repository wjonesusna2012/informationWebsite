import { LabelRounded } from '@mui/icons-material';
import AddNarrativeIcon from '@mui/icons-material/LibraryAdd';
import MenuIcon from '@mui/icons-material/Menu';
import { Autocomplete, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTRPC } from '.';
import AddMenu from './menus/AddMenu';
import AddTag from './menus/AddTag';
import Menu from './menus/Menu';

const NavigationMenu = () => {
  const trpc = useTRPC();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null);
  const [addTagAnchorEl, setAddTagAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const { data: options } = useQuery(
    trpc.getTagList.queryOptions({
      searchString: tagSearchTerm
    })
  );
  const open = Boolean(anchorEl);
  const openAdd = Boolean(addAnchorEl);
  const openAddTag = Boolean(addTagAnchorEl);

  const autocompleteOptions = options?.map((o) => o.tagName) ?? [];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!addAnchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!addAnchorEl) {
      setAddAnchorEl(event.currentTarget);
    } else {
      setAddAnchorEl(null);
    }
  };
  const handleAddTagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!addTagAnchorEl) {
      setAddTagAnchorEl(event.currentTarget);
    } else {
      setAddTagAnchorEl(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddClose = () => {
    setAddAnchorEl(null);
  };
  const handleAddTagClose = () => {
    setAddTagAnchorEl(null);
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
            onClick={handleAddTagClick}
          >
            <LabelRounded />
          </IconButton>
          <Menu
            anchorElement={anchorEl}
            closeHandler={handleClose}
            open={open}
          />
          <AddMenu
            anchorElement={addAnchorEl}
            closeHandler={handleAddClose}
            open={openAdd}
          />
          <AddTag
            anchorElement={addTagAnchorEl}
            closeHandler={handleAddTagClose}
            open={openAddTag}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Narratives
          </Typography>
          <Autocomplete
            value={tagSearchTerm}
            onChange={(_event, value) => {
              if (!!value) setTagSearchTerm(value);
              else setTagSearchTerm('');
            }}
            disablePortal
            id="combo-box-demo"
            options={autocompleteOptions}
            sx={{ width: 300, padding: 1, color: 'white' }}
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
