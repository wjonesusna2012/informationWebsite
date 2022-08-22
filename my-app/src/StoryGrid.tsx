import * as React from 'react';
import Grid from '@mui/material/Grid';
import TopicCard, { TopicCardProps } from './TopicCard';

export interface StoryGridProps {
  cardArray: Array<TopicCardProps>;
}

const StoryGrid: React.FC<StoryGridProps> = ({ cardArray }) => {
  return (
    <Grid container spacing={3}>
      {cardArray.map((cA) => (
        <Grid item xs={6} md={4} xl={3}>
          <TopicCard {...cA} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryGrid;
