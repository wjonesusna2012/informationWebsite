// import NarrativeAccordion from './NarrativeAccordian';
import { CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useTRPC } from '.';

const DisplayNarrative = () => {
  const trpc = useTRPC();
  const { narrativeId } = useParams<{ narrativeId: string }>();
  const greetQueryResult = useQuery(
    trpc.getNarrativeStories.queryOptions({ narrativeId: narrativeId ?? '' })
  );
  const { data: narratives, isLoading } = greetQueryResult;
  console.log(narratives);
  if (isLoading) return <CircularProgress />;
  return <Stack></Stack>;
};

export default DisplayNarrative;
