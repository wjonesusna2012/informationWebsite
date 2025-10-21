import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { NarrativeAccordianProps } from './interfaces';
import {
  Grid,
  Chip,
  Typography,
  IconButton,
  TextField,
  Autocomplete,
  Box,
  Button
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Add, ExpandMore, NoteAdd } from '@mui/icons-material';
import { trpc } from '.';

const NarrativeAccordion = ({
  narrativeId,
  tags,
  summary,
  details,
  abbreviation,
  children
}: NarrativeAccordianProps) => {
  const [displayTagAddition, setDisplayTagAddition] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const { data: options } = trpc.getTagList.useQuery({});
  const addTagsToNarrative = trpc.addTagsToNarrative.useMutation();

  const handleAddTag = async () => {
    addTagsToNarrative.mutate({
      narrativeId,
      tags: [newTag]
    });
    setDisplayTagAddition(false);
    setNewTag('');
    setInputValue('');
  };

  const isExistingTag = options?.some(
    (option) => option.tagName === inputValue
  );
  const tagOptions = options?.map((o) => o.tagName) ?? [];
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ boxShadow: '2px 0 0 0 rgba(0, 0, 0, 0.5)' }}
        >
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography align="left" variant="h5">
                {summary}
              </Typography>
            </Grid>
            <Grid item xs={7} alignItems="center">
              {tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  variant="outlined"
                  clickable
                  sx={{ marginRight: 1 }}
                />
              ))}
              {!displayTagAddition && (
                <IconButton onClick={() => setDisplayTagAddition(true)}>
                  <Add />
                </IconButton>
              )}
              {displayTagAddition && (
                <Box display="inline-flex">
                  <Autocomplete
                    freeSolo
                    options={tagOptions}
                    filterOptions={(options, params) => {
                      const filtered = createFilterOptions<string>()(
                        options,
                        params
                      );

                      const { inputValue } = params;
                      if (
                        inputValue !== '' &&
                        !filtered.some((e) => e === inputValue)
                      ) {
                        filtered.push(`Add "${inputValue}"`);
                      }
                      return filtered;
                    }}
                    value={newTag}
                    onChange={(event, newValue) => setNewTag(newValue ?? '')}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) =>
                      setInputValue(newInputValue)
                    }
                    renderInput={(params) => {
                      const { inputProps } = params;
                      const { value } = inputProps;
                      if (!tagOptions.includes(value as string)) {
                        return (
                          <Button
                            {...params}
                            value={value}
                            variant="outlined"
                            size="small"
                          />
                        );
                      }
                      return (
                        <TextField
                          {...params}
                          label="New Tag"
                          variant="outlined"
                          size="small"
                        />
                      );
                    }}
                    sx={{ width: 150, marginRight: 1 }}
                  />
                  {isExistingTag ? (
                    <IconButton onClick={handleAddTag}>
                      <NoteAdd />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleAddTag}>
                      <NoteAdd />
                    </IconButton>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left" variant="h6">
            {details}
          </Typography>
          {!!children && children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NarrativeAccordion;
