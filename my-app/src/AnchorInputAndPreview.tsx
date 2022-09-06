import { CardContent, CardHeader, TextField, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface AnchorInputProps {
  anchorLink: string;
  setAnchorLink: (newAnchorLink: string) => void;
}

interface AnchorState {
  imgSrc: string;
  description: string;
  title: string;
}

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
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
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
      <TextField label="Link" placeholder="Enter Link">
        {anchorLink}
      </TextField>
      <Card>
        <CardHeader title={previewState.title}></CardHeader>
        <CardContent>{previewState.description}</CardContent>
        <img
          src={previewState.imgSrc}
          alt={`${previewState.title}`}
          style={{ maxHeight: 200 }}
        />
      </Card>
    </>
  );
};

export default AnchorInputAndPreview;
