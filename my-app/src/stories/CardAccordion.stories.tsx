import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardAccordion from '../NarrativeAccordian';
import TopicCard from '../TopicCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Card Accordion Test' ,
  component: CardAccordion,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CardAccordion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardAccordion> = (args) => (
<CardAccordion {...args}>
  <TopicCard
    id={1}
    selected={false}
    toggleStory={() => {}}
    headerTitle='Title 1'
    postTitle='Post Title 1'
    summary='Lorem Ipsum Delr sit net amit.'
    date='September 21, 2022' 
  />
  <TopicCard
    id={2}
    selected
    toggleStory={() => {}}
    headerTitle='Title 2'
    postTitle='Post Title 2'
    summary='Lorem Ipsum Delr sit net amit.'
    date='September 22, 2022' 
  />
</CardAccordion>
) ;

export const GenericText = Template.bind({});
GenericText.args= {
  summary: 'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  details: 'LLorem Ipsum Doelr sit net amit. Filler text to make this go on foreverLorem Ipsum Doelr sit net amit. Filler text to make this go on foreverLorem Ipsum Doelr sit net amit. Filler text to make this go on foreverLorem Ipsum Doelr sit net amit. Filler text to make this go on foreverorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
};
