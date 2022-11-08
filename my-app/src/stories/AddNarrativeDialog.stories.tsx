import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddNarrativeDialog from '../AddNarrativeDialog';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Add Narrative Dialog',
  component: AddNarrativeDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AddNarrativeDialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddNarrativeDialog> = () => (
  <AddNarrativeDialog />
);

export const Primary = Template.bind({});
Primary.args = {};
