import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import SpinIcon from '@mui/icons-material/Bolt'

// Do this as there is a bug with @types/react dependency for this package.
const DraggableAny: any = Draggable;
function PaperComponent(props: PaperProps) {
  return (
    <DraggableAny
      axis='both'
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </DraggableAny>
  );
}

export default function DraggableDialog() {
  const [summary, setSummary] = React.useState<String>('');
  const [fileDialogOpen, setFileDialogOpen] = React.useState<boolean>(true);

  return (
    <Dialog
      maxWidth="md"
      open={fileDialogOpen}
      onClose={() => {
        setFileDialogOpen(false);
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      fullWidth
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Spin a Narrative
      </DialogTitle>
      <DialogContent>
        <Stack spacing={6}>
          <TextField margin="normal" label="Narrative Title"></TextField>
          <TextField
            id="narrative-summary"
            label="Narrative"
            aria-describedby="story-summary-text"
            value={summary}
            multiline
            minRows={10}
            onChange={(e) => {
              const { value } = e.target;
              if (value.length <= 5000) setSummary(e.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => {}} endIcon={<SpinIcon />}>Spin</Button>
      </DialogActions>
    </Dialog>
  );
}
