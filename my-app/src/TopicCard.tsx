import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface TopicCardProps {
  headerTitle: string,
  postTitle: string,
  summary: string,
  date: string,
};

const TopicCard = ({headerTitle, postTitle, summary, date}: TopicCardProps) => {
  return (
    <Card variant="outlined" sx={{maxWidth: 500}}>
      <CardMedia
        component="img"
        image="https://picsum.photos/200/100"
        alt="Test Alt Text"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {headerTitle}
        </Typography>
        <Typography variant="h5" component="div">
          {postTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {summary}
        </Typography>
        <Typography variant="body2">
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default TopicCard