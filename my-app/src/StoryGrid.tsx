import * as React from 'react';
import Grid from '@mui/material/Grid';
import { StoryGridProps } from './interfaces';
import StoryTopicCard from './StoryTopicCard';

const StoryGrid: React.FC<StoryGridProps> = ({ cardArray }) => {
  console.log(cardArray);
  return (
    <Grid container spacing={3} sx={{ marginTop: 0 }}>
      {cardArray.map((cA) => (
        <Grid key={cA} item xs={6} md={4} xl={3}>
          <StoryTopicCard storyId={cA} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryGrid;
