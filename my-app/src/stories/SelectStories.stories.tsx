import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StoryGrid from '../StoryGrid';
import { TopicCardProps, TopicCardData } from '../interfaces/index';
import SelectStories from '../SelectStories';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Select Story Carousel',
  component: SelectStories,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof SelectStories>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectStories> = (args) => (
  <SelectStories {...args} />
);

export const GenericGrid = Template.bind({});
const genericArgs = {
  id: 0,
  headerTitle: 'Featured',
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021'
};

const range = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
];
const args = {
  availableStories: range.map<TopicCardData>((r) => {
    return {
      ...genericArgs,
      id: r,
      headerTitle: `Featured ${r}`,
      selected: r % 2 === 0
    };
  })
};

GenericGrid.args = args;
