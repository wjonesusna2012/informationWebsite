import React from 'react';
import NarrativeAccordion from './NarrativeAccordian';
import { Stack } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { trpc } from '.';

const ListNarratives = () => {
  const { data: narratives, isLoading } = trpc.getNarrativesList.useQuery();
  if (isLoading) return <CircularProgress />;
  return (
    <Stack spacing={2}>
      {narratives?.map((n) => (
        <NarrativeAccordion
          narrativeId={n._id}
          tags={n.tags ?? ['Topic 1', 'Big Tournament Wins']}
          summary={n.title as string}
          details={n.summary as string}
          abbreviation={n.abbreviation as string}
        />
      ))}
    </Stack>
  );
};

export default ListNarratives;
