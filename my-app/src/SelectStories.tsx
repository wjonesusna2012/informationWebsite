import React, { useState } from 'react';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import { SelectStoriesProps, TopicCardProps } from './interfaces';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Grid } from '@mui/material';
import TopicCard from './TopicCard';

const SelectedStoryAccoridan = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return (
    <Accordion>
      <AccordionSummary>{title}</AccordionSummary>
      <AccordionDetails>{description}</AccordionDetails>
    </Accordion>
  );
};
const SelectedStories = ({
  selectedStories
}: {
  selectedStories: Array<TopicCardProps>;
}) => {
  return (
    <>
      {selectedStories.map((sS) => {
        return (
          <SelectedStoryAccoridan
            title={sS.postTitle}
            description={sS.summary}
          />
        );
      })}
    </>
  );
};

const SelectStoriesCarousel = ({
  selectedStories,
  storiesCurrentlyDisplayed
}: {
  selectedStories: Array<number>;
  storiesCurrentlyDisplayed: Array<TopicCardProps>;
}) => {
  return (
    <Grid container spacing={1}>
      {storiesCurrentlyDisplayed.map((sCD) => {
        return (
          <Grid item xs={6} md={4} xl={3}>
            <TopicCard {...sCD} />
          </Grid>
        );
      })}
    </Grid>
  );
};
const SelectStories = ({ availableStories }: SelectStoriesProps) => {
  const storiesPerGrid = 6;
  const pages = Math.ceil(availableStories.length / storiesPerGrid);

  const [selected, setSelected] = useState<Array<number>>([]);
  const [page, setPage] = useState<number>(1);
  return (
    <>
      <SelectedStories
        selectedStories={_.intersectionWith(
          availableStories,
          selected,
          (avail, sel) => sel === avail.id
        )}
      />
      <SelectStoriesCarousel
        selectedStories={selected}
        storiesCurrentlyDisplayed={availableStories}
      />
      <Pagination
        count={pages}
        page={page}
        onChange={(e, val) => {
          setPage(val);
        }}
      />
    </>
  );
};

export default SelectStories;
