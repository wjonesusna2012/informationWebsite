import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import SpinIcon from '@mui/icons-material/Bolt'
import { useForm, FormProvider } from 'react-hook-form';
import RHFTextField from './RHFTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNarrativeType, addNarrativeSchema } from '@info/schemas';
import { trpc } from '.';

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
  const [fileDialogOpen, setFileDialogOpen] = React.useState<boolean>(true);
  const addNarrativeMutation = trpc.addNarrative.useMutation();
  const methods = useForm<AddNarrativeType>({
    defaultValues: {
      summary: '',
      title: '',
      abbreviation: '',
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(addNarrativeSchema),
  });

  const submitHandler = async (formData: AddNarrativeType) => {
    addNarrativeMutation(formData);
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
        Create a Narrative
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods} >
          <Stack spacing={3}>
            <RHFTextField name="title" label="Narrative Title" />
            <RHFTextField name="abbreviation" label="Narrative Abbreviation (12 characters max)" />
            <RHFTextField name="summary" label="Narrative Summary" textFieldSpecificProps={{
              multiline: true,
              minRows: 10,
            }} />
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setFileDialogOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={methods.handleSubmit(submitHandler)} endIcon={<SpinIcon />}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
