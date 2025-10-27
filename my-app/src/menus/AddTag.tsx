import * as React from 'react';
import Menu from '@mui/material/Menu';
import { MenuInterface } from '../interfaces';
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '../reactHookFormsComponents/RHFTextField';
import { addTagSchema, AddTagType } from '@info/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '..';
const AddTag: React.FC<MenuInterface> = ({
  open,
  anchorElement,
  closeHandler
}) => {
  const methods = useForm<AddTagType>({
    defaultValues: {
      tagName: '',
      tagText: ''
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(addTagSchema)
  });
  const { mutate: addTagMutation } = trpc.addTag.useMutation();
  const submitTag = async (formData: AddTagType) => {
    addTagMutation(formData);
    closeHandler();
    methods.reset();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorElement}
      open={open}
      onClose={closeHandler}
      variant="menu"
      sx={{ alignItems: 'center', display: 'flex' }}
    >
      <FormProvider {...methods}>
        <Typography variant="h6" sx={{ margin: 1 }}>
          Create Tag
        </Typography>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <RHFTextField
            label="Tag Name"
            textFieldSpecificProps={{
              sx: { margin: 1, marginBottom: 0 }
            }}
            name="tagName"
          />
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <RHFTextField
            label="Tag Description"
            textFieldSpecificProps={{
              sx: { margin: 1, marginBottom: 0 },
              multiline: true,
              minRows: 3
            }}
            name="tagText"
          />
        </Box>
        <Box sx={{}}>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={methods.handleSubmit(submitTag)}
          >
            Add Tag
          </Button>
        </Box>
      </FormProvider>
    </Menu>
  );
};

export default AddTag;
