import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AnchorInputAndPreview from '../AnchorInputAndPreview';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const qC = new QueryClient();
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Anchor Input And Preview Story',
  component: AnchorInputAndPreview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [
    Story => {
      return (
        <QueryClientProvider client={qC}>
          <Story />
        </QueryClientProvider>
      )
    }
  ]
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
export const NoLink = Template.bind({});
NoLink.args = {
  anchorLink: ''
};
