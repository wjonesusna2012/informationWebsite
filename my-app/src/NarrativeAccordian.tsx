import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AccordianDetails from '@mui/material/AccordionDetails';
import { NarrativeAccordianProps } from './interfaces';
import { Grid, Chip, Typography, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const CardAccordion = ({ summary, details, abbreviation, children }: NarrativeAccordianProps) => {
  return (
    <Accordion>
      <AccordianSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={9}>
            <Typography align="left" variant='h6'>
              {summary}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: 'flex' }} justifyContent="flex-start">
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
  );
};

export default CardAccordion;
