import React from 'react';
// import CardAccordion from './NarrativeAccordian';
import { Stack } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { trpc } from '.';
import { useParams } from 'react-router-dom';

const DisplayNarrative = () => {
  const { narrativeId } = useParams<{ narrativeId: string }>();
  const { data: narratives, isLoading } = trpc.getNarrativeStories.useQuery({
    narrativeId: narrativeId ?? '',
  });
  console.log(narratives);
  if (isLoading) return <CircularProgress />;
  return (
    <Stack>
    </Stack>
  );
};

export default DisplayNarrative;
