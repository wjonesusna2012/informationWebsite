import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AccordianDetails from '@mui/material/AccordionDetails';
import { CardAccordianProps } from './interfaces';
import { Chip, Typography } from '@mui/material';

const CardAccordion = ({ summary, details, abbreviation, children }: CardAccordianProps) => {
  return (
    <Accordion>
      <AccordianSummary>
        <Typography variant='h3'>
          {summary}
        </Typography>
        <Chip label={abbreviation} />
      </AccordianSummary>
      <AccordianDetails>{details}</AccordianDetails>
      {!!children && children}
    </Accordion>
  );
};

export default CardAccordion;
