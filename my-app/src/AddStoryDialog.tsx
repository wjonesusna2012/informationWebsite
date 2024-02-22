import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StoryIcon from '@mui/icons-material/AutoStoriesRounded';
import AnchorInputAndPreview from './AnchorInputAndPreview';
import RHFTextField from './RHFTextField';
import RHFDatePicker from './RHFDatePicker';
import { AddStoryType, addStorySchema } from '@info/schemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '.';

const DraggableAny: any = Draggable;
function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef(null);
  return (
    <DraggableAny
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} />
    </DraggableAny>
  );
}

export default function DraggableDialog() {
  const [fileDialogOpen, setFileDialogOpen] = React.useState<boolean>(true);
  const [filesSaved, setFilesSaved] = React.useState<Array<string>>([]);
  const [anchorLink, setAnchorLink]= React.useState<string>('')
  const { mutate: addStoryMutation } = trpc.addStory.useMutation();
  const methods = useForm<AddStoryType>({
    defaultValues: {
      storyTitle: '',
      date: new Date(),
      summary: '',
      link: '',
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(addStorySchema),
  });
  const submitStory = async (formData: AddStoryType) => {
    addStoryMutation(formData);
    setFileDialogOpen(false);
  }
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
        <FormProvider {...methods}>
          <Stack spacing={3} sx={{ paddingTop: 2 }}>
            <RHFTextField label="Story Title" name="storyTitle" />
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <RHFDatePicker label="Date" name="date"/>
            </LocalizationProvider>
            <RHFTextField 
              label="Summary"
              name="summary"
              textFieldSpecificProps={{
                multiline: true,
                minRows: 5, 
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
            <AnchorInputAndPreview anchorLink={anchorLink} setAnchorLink={(l) => {
              setAnchorLink(l)
            }} />
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="contained" onClick={methods.handleSubmit(submitStory)} endIcon={<StoryIcon />}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

// Young professionals and early leaders Kelly HoHertz meetings pickleball, round tables, assistance with L* candidates.
// Tyler Young, University relations. Bring more awareness to charter. Scholarship programs. 1 or 2 a year.
// Lauren membership committee attracting and retaining members. Programming deliver education content 