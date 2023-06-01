import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StoryGrid from '../StoryGrid';
import { TopicCardProps } from '../interfaces/index';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Story Grid',
  component: StoryGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof StoryGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StoryGrid> = (args) => (
  <StoryGrid {...args} />
);

export const GenericGrid = Template.bind({});
const genericArgs = {
  headerTitle: 'Featured',
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021',
  selected: false,
  toggleStory: () => {},
};

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const args = {
  cardArray: range.map((r) => {
    return {
      ...genericArgs,
      id: r,
      headerTitle: `Featured ${r}`
    };
  })
};

GenericGrid.args = args;
