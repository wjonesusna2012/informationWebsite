import React, { useState } from 'react';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
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

  const [selected, setSelected] = useState<Array<number>>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(12);
  const pages = Math.ceil(availableStories.length / rowsPerPage);

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
            (a.id > (page) * rowsPerPage && a.id <= (page + 1) * rowsPerPage) || rowsPerPage === -1
        )}
        toggleStory={toggleStory}
      />
      <TablePagination
        count={availableStories.length}
        page={page}
        onPageChange={(_e, val) => {
          setPage(val);
        }}
        rowsPerPageOptions={[12, 24, 48, { value: -1, label: 'All'}]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setPage(0);
          setRowsPerPage(parseInt(e.target.value, 10));
        }}
        
      />
    </>
  );
};

export default SelectStories;
