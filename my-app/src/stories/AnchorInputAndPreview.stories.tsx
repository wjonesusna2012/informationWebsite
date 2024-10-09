import React from 'react';
import { Meta } from '@storybook/react';
import AnchorInputAndPreview from '../AnchorInputAndPreview';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const qC = new QueryClient();
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AnchorInputAndPreview> = {
  title: 'Anchor Input And Preview Story',
  component: AnchorInputAndPreview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  render: () => (
    <AnchorInputAndPreview
      anchorLink="http://twitter.com"
      setAnchorLink={() => {}}
    />
  )

  // decorators: [
  //   Story => {
  //     return (
  //       <QueryClientProvider client={qC}>
  //         <Story />
  //       </QueryClientProvider>
  //     )
  //   }
  // ]
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const GenericAnchor = {
  args: { anchorLink: '' }
};
