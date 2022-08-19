import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AccordianDetails from '@mui/material/AccordionDetails';

export interface CardAccordianProps {
  summary: string;
  details: string;
  // children: React.ReactChildren,
}
const CardAccordion = ({ summary, details }: CardAccordianProps) => {
  return (
    <Accordion>
      <AccordianSummary>{summary}</AccordianSummary>
      <AccordianDetails>{details}</AccordianDetails>
      {/* {children} */}
    </Accordion>
  );
};

export default CardAccordion;
