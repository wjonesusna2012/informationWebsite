import { Skeleton } from '@mui/material';
import { trpc } from '.';
import TopicCard from './TopicCard';
const StoryTopicCard = ({ storyId }: { storyId: string }) => {
  const { data: storyData, isLoading } = trpc.getStory.useQuery({ storyId });
  if (isLoading || !storyData) return <Skeleton />;

  return (
    <TopicCard
      id={storyData?._id}
      postTitle={storyData.storyTitle}
      summary={storyData.summary}
      date={storyData.date.toDateString()}
      selected={false}
      toggleStory={() => {}}
    />
  );
};

export default StoryTopicCard;
