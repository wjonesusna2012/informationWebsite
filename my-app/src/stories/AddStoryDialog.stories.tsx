import { Meta } from '@storybook/react';
import AddStoryDialog from '../AddStoryDialog';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// const qC = new QueryClient();
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddStoryDialog> = {
  title: 'Add Story Dialog',
  component: AddStoryDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
  // decorators: [
  //   (Story) => (
  //     <QueryClientProvider client={qC}>
  //       <Story />
  //     </QueryClientProvider>
  //   )
  // ]
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const GenericAddStoryDialog = {
  args: {}
};
