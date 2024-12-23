import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
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
  const [loaded, setLoaded] = useState(false);
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
      <CardMedia
        component="img"
        image="https://picsum.photos/300/300"
        alt="Test Alt Text"
        onLoad={() => {
          setLoaded(true);
        }}
        style={loaded ? {} : { display: 'none' }}
      />
      <CardMedia
        component="img"
        image="web.png"
        alt="Test Alt Text"
        style={loaded ? { display: 'none' } : {}}
      />
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
          <a style={{ textDecoration: 'none' }} href="google.com">
            Learn More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default TopicCard;
