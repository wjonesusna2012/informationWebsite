import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AccordianDetails from '@mui/material/AccordionDetails';
import { CardAccordianProps } from './interfaces';

const CardAccordion = ({ summary, details, children}: CardAccordianProps) => {
  return (
    <Accordion>
      <AccordianSummary>{summary}</AccordianSummary>
      <AccordianDetails>{details}</AccordianDetails>
      {children}
    </Accordion>
  );
};

export default CardAccordion;
