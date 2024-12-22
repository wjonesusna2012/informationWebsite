import StoryGrid from '../StoryGrid';
import { StoryObj, Meta } from '@storybook/react/*';

const meta: Meta<typeof StoryGrid> = {
  title: 'Story Grid',
  component: StoryGrid,
  argTypes: {}
};

export default meta;

const genericArgs = {
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021',
  selected: false,
  toggleStory: () => {}
};
const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

type Story = StoryObj<typeof StoryGrid>;
export const GenericGrid: Story = {
  args: {
    cardArray: range.map((r) => {
      return {
        ...genericArgs,
        id: r,
      };
    })
  }
};
