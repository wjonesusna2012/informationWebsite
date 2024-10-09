import { Meta, StoryObj } from '@storybook/react';
import AddNarrativeDialog from '../AddNarrativeDialog';
import {
  // QueryClientProvider,
  // QueryClient
} from '@tanstack/react-query';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const qC = new QueryClient();
const meta: Meta<typeof AddNarrativeDialog> = {
  title: 'Add Narrative Dialog',
  component: AddNarrativeDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
  // decorators: [
  //   () => ({
  //     template:
  //       '<QueryClientProvider client={qC}><story {...args} /></QueryClientProvider>'
  //   })
  // ]
};
export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof AddNarrativeDialog>;
export const GenericAddNarrativeDialog: Story = {
  args: {}
};
