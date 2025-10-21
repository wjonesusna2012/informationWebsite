import React from 'react';
import NarrativeAccordion from './NarrativeAccordian';
import { Stack } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { trpc } from '.';
import StoryGrid from './StoryGrid';

const ListNarratives = () => {
  const { data: narratives, isLoading } = trpc.getNarrativesList.useQuery();
  const { data: narrativeStories } = trpc.getNarrativeStories.useQuery({
    narrativeId: Array.isArray(narratives) && narratives.length > 0 ? narratives[0]._id : ''
  });
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
