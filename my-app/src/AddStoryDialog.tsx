import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import { DateTime } from 'luxon';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [postDate, setPostDate] = React.useState<DateTime | null>(
    DateTime.now()
  );
  const [summary, setSummary] = React.useState<String>('');
  const [fileDialogOpen, setFileDialogOpen] = React.useState<boolean>(true);
  const [filesSaved, setFilesSaved] = React.useState<Array<String>>([]);
  React.useEffect(() => {
    console.log(filesSaved);
  }, [filesSaved]);
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
        Add Story
      </DialogTitle>
      <DialogContent>
        <Stack spacing={6}>
          <TextField margin="normal" label="Enter Title:"></TextField>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DesktopDatePicker
              label="Date"
              renderInput={(props) => <TextField {...props} />}
              value={postDate}
              onChange={(newValue: DateTime | null) => {
                setPostDate(newValue);
              }}
            />
          </LocalizationProvider>
          <TextField
            id="story-summary"
            label="Summary"
            aria-describedby="story-summary-text"
            value={summary}
            multiline
            minRows={5}
            onChange={(e) => {
              const { value } = e.target;
              if (value.length <= 1000) setSummary(e.target.value);
            }}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              hidden
              multiple
              type="file"
              onChange={(event) => {
                if (event !== undefined) {
                  const fileList = event!.target!.files;
                  console.log(fileList);
                  const fileArray = [];
                  for (let i = 0; i < fileList!.length; i++) {
                    fileArray.push(
                      URL.createObjectURL(fileList!.item(i) as File)
                    );
                  }
                  setFilesSaved(fileArray);
                }
              }}
              accept="images/*"
            />
          </Button>
          {filesSaved!.length > 0 && (
            <ImageList cols={3}>
              {filesSaved!.map((file) => (
                <ImageListItem>
                  <img src={file.toString()} alt={file.toString()} />
                  <ImageListItemBar
                    title={file}
                    actionIcon={
                      <IconButton>
                        <DeleteIcon
                          color="primary"
                          onClick={() => {
                            setFilesSaved([
                              ...filesSaved.filter((e) => e !== file)
                            ]);
                          }}
                        />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => {}}>
          Cancel
        </Button>
        <Button onClick={() => {}}>Add Story</Button>
      </DialogActions>
    </Dialog>
  );
}
