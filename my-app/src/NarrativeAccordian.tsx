import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AccordianDetails from '@mui/material/AccordionDetails';
import { NarrativeAccordianProps } from './interfaces';
import { Grid, Chip, Typography, Box, IconButton } from '@mui/material';
import { Add, ExpandMore } from '@mui/icons-material';

const NarrativeAccordion = ({
  tags,
  summary,
  details,
  abbreviation,
  children
}: NarrativeAccordianProps) => {
  return (
    <>
      <Accordion>
        <AccordianSummary
          expandIcon={<ExpandMore />}
          sx={{ boxShadow: '2px 0 0 0 rgba(0, 0, 0, 0.5)' }}
        >
          <Grid container>
            <Grid item xs={5}>
              <Typography align="left" variant="h6">
                {summary}
              </Typography>
            </Grid>
            <Grid item xs={4} alignItems="left">
              {tags.map((t) => (
                <Chip label={t} variant="outlined" clickable />
              ))}
              <IconButton>
                <Add />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ display: 'flex' }} justifyContent="flex-end">
                <Chip label={abbreviation} />
              </Box>
            </Grid>
          </Grid>
        </AccordianSummary>
        <AccordianDetails>
          <Typography align="left" variant="body1">
            {details}
          </Typography>
          {!!children && children}
        </AccordianDetails>
      </Accordion>
    </>
  );
};

export default NarrativeAccordion;
