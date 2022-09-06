import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddStoryDialog from '../AddStoryDialog';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Add Story Dialog',
  component: AddStoryDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AddStoryDialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddStoryDialog> = () => (
  <AddStoryDialog />
);

export const Primary = Template.bind({});
Primary.args = {};
