import { Meta, StoryObj } from '@storybook/react';
import { TopicCardData } from '../interfaces/index';
import SelectStories from '../SelectStories';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SelectStories> = {
  title: 'Select Story Carousel',
  component: SelectStories,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SelectStories>;

const genericArgs = {
  id: 0,
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021'
};

const range = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

export const GenericGrid: Story = {
  args: {
    availableStories: range.map<TopicCardData>((r) => {
      return {
        ...genericArgs,
        id: r,
        selected: r % 2 === 0
      };
    })
  }
};
