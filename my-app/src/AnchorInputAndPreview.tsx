import { CardContent, CardHeader, TextField, Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { AnchorState, AnchorInputProps } from './interfaces';

const AnchorInputAndPreview: React.FC<AnchorInputProps> = ({
  anchorLink,
  setAnchorLink
}) => {
  const [previewState, setPreviewState] = useState<AnchorState>({
    imgSrc: '',
    description: '',
    title: ''
  });
  useEffect(() => {
    const params = {
      url: anchorLink, 
    };
    const proxyUrl = new URL('http://localhost:3001/proxy/og/');
    proxyUrl.search = new URLSearchParams(params).toString();
    fetch(proxyUrl, {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { description, title, image } = data;
        setPreviewState({
          imgSrc: image,
          description,
          title
        });
      })
      .catch((reason) => {
        setPreviewState({
          imgSrc: '',
          description: 'ERROR in pinging',
          title: 'ERROR'
        });
      });
  }, [anchorLink]);
  return (
    <>
      <Stack spacing={2} direction="row">
        <TextField label="Link" placeholder="Enter Link" value={anchorLink}/>
        <Button variant="contained">Add</Button>
      </Stack>
      <Stack>
        <Typography variant='h6'>{previewState.title}</Typography>
        <Typography variant='body1'>{previewState.description}</Typography>
        <img
          src={previewState.imgSrc}
          alt={`${previewState.title}`}
          style={{ maxHeight: 200 }}
        />
      </Stack>
    </>
  );
};

export default AnchorInputAndPreview;
