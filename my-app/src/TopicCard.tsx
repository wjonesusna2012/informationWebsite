import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TopicCardProps } from './interfaces';

const TopicCard = ({
  id,
  postTitle,
  summary,
  date,
  selected,
  toggleStory
}: TopicCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: '8px 8px 8px grey',
        textAlign: 'start',
        maxWidth: 500,
        ...(selected ? { border: 2, borderColor: 'primary.main' } : {})
      }}
      onClick={() => toggleStory(id)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {postTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {summary}
        </Typography>
        <Typography variant="body2">
          {new Date(date).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a style={{ textDecoration: 'none' }} href="https://www.google.com">
            Learn More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default TopicCard;
