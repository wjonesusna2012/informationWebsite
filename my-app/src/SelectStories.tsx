import React, { useState } from 'react';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import { SelectStoriesProps, TopicCardData } from './interfaces';
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
  selectedStories: Array<TopicCardData>;
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
  storiesCurrentlyDisplayed,
  toggleStory
}: {
  selectedStories: Array<number>;
  storiesCurrentlyDisplayed: Array<TopicCardData>;
  toggleStory: (storyID: number) => void;
}) => {
  return (
    <Grid container spacing={1}>
      {storiesCurrentlyDisplayed.map((sCD) => {
        return (
          <Grid item xs={6} md={4} xl={3}>
            <TopicCard
              {...sCD}
              toggleStory={toggleStory}
              selected={selectedStories.includes(sCD.id)}
            />
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

  const toggleStory: (storyID: number) => void = (storyID) => {
    if (selected.includes(storyID)) {
      setSelected(selected.filter((s) => s !== storyID));
    } else {
      setSelected([...selected, storyID]);
    }
  };
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
        storiesCurrentlyDisplayed={availableStories.filter(
          (a) =>
            a.id > (page - 1) * storiesPerGrid && a.id <= page * storiesPerGrid
        )}
        toggleStory={toggleStory}
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
