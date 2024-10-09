import { Meta, StoryObj } from '@storybook/react/*';
import TopicCard from '../TopicCard';

const meta: Meta<typeof TopicCard> = {
  title: 'Topic Card',
  component: TopicCard,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof TopicCard>;
export const GenericText: Story = {
  args: {
    headerTitle: 'Featured Updated',
    postTitle: 'This is a test post title',
    summary:
      'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
    date: 'September 21, 2021',
    toggleStory: () => {},
  }
};
