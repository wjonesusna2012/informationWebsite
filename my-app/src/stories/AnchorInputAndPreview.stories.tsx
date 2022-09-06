import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AnchorInputAndPreview from '../AnchorInputAndPreview';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Anchor Input And Preview Story',
  component: AnchorInputAndPreview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AnchorInputAndPreview>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AnchorInputAndPreview> = () => (
  <AnchorInputAndPreview
    anchorLink="http://twitter.com"
    setAnchorLink={() => {}}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
