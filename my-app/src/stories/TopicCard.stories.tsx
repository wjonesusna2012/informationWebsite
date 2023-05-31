import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopicCard  from '../TopicCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Topic Card',
  component: TopicCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TopicCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopicCard> = (args) => <TopicCard {...args} />;

export const GenericText = Template.bind({});
GenericText.args= {
  headerTitle: 'Featured',
  postTitle: 'This is a test post title',
  summary: 'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021',
};
