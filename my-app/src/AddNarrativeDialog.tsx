import { zodResolver } from '@hookform/resolvers/zod';
import { addNarrativeSchema } from '@info/schemas';
import SpinIcon from '@mui/icons-material/Bolt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import Draggable from 'react-draggable';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '.';
import { ActionTypes, DialogContext, DialogDispatchContext } from './App';
import RHFTextField from './reactHookFormsComponents/RHFTextField';

type AddNarrativeType = z.infer<typeof addNarrativeSchema>;

// Do this as there is a bug with @types/react dependency for this package.
const DraggableAny: any = Draggable;
function PaperComponent(props: PaperProps) {
  return (
    <DraggableAny
      axis="both"
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </DraggableAny>
  );
}

export default function DraggableDialog() {
  const { createNarrative } = useContext(DialogContext);
  const dispatch = useContext(DialogDispatchContext);
  const { mutate: addNarrativeMutation } = trpc.addNarrative.useMutation();
  const methods = useForm<z.infer<typeof addNarrativeSchema>>({
    defaultValues: {
      summary: '',
      title: '',
      abbreviation: ''
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(addNarrativeSchema)
  });

  const submitHandler = async (formData: AddNarrativeType) => {
    addNarrativeMutation(formData);
  };

  return (
    <Dialog
      maxWidth="md"
      open={createNarrative}
      onClose={() => {
        dispatch!(ActionTypes.CLOSE_NARRATIVE);
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      fullWidth
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Create a Narrative
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <Stack spacing={3} sx={{ paddingTop: 2 }}>
            <RHFTextField name="title" label="Narrative Title" />
            <RHFTextField
              name="abbreviation"
              label="Narrative Abbreviation (12 characters max)"
            />
            <RHFTextField
              name="summary"
              label="Narrative Summary"
              textFieldSpecificProps={{
                multiline: true,
                minRows: 10
              }}
            />
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch!(ActionTypes.CLOSE_NARRATIVE);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={methods.handleSubmit(submitHandler)}
          endIcon={<SpinIcon />}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
