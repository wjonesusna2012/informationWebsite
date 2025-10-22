import { CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '.';
import NarrativeAccordion from './NarrativeAccordian';
import StoryGrid from './StoryGrid';

const ListNarratives = () => {
  const trpc = useTRPC();
  const { data: narratives, isLoading } = useQuery(
    trpc.getNarrativesList.queryOptions()
  );
  const { data: narrativeStories } = useQuery(
    trpc.getNarrativeStories.queryOptions({
      narrativeId:
        Array.isArray(narratives) && narratives.length > 0
          ? narratives[0]._id
          : ''
    })
  );
  if (isLoading) return <CircularProgress />;
  return (
    <Stack spacing={2}>
      {narrativeStories?.map((n) => (
        <NarrativeAccordion
          narrativeId={n._id}
          tags={n.tags ?? ['Topic 1', 'Big Tournament Wins']}
          summary={n.title as string}
          details={n.summary as string}
          abbreviation={n.abbreviation as string}
        >
          <StoryGrid
            cardArray={
              !narrativeStories
                ? []
                : n.stories.map((nS) => {
                    return {
                      id: nS._id,
                      postTitle: nS.storyTitle,
                      summary: nS.summary,
                      date: new Date(nS.createdAt).toISOString(),
                      selected: false,
                      toggleStory: () => {}
                    };
                  })
            }
          />
        </NarrativeAccordion>
      ))}
    </Stack>
  );
};

export default ListNarratives;
