import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddNarrativeDialog from '../AddNarrativeDialog';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const qC = new QueryClient();
export default {
  title: 'Add Narrative Dialog',
  component: AddNarrativeDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [
    Story => (
      <QueryClientProvider client={qC}>
        <Story />
      </QueryClientProvider>
    )
  ]
} as ComponentMeta<typeof AddNarrativeDialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddNarrativeDialog> = () => (
  <AddNarrativeDialog />
);

export const Primary = Template.bind({});
Primary.args = {};
