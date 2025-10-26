import { getWorker, initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';
import { TRPCReactProvider } from '../src/msw';

initialize();

const preview = {
  parameters: {
    reactContext: {
      // context: DialogContext,
      contextValues: {
        createNarrative: false,
        createStory: false,
        addTag: false
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <TRPCReactProvider>
        <Story />
      </TRPCReactProvider>
    )
  ]
};

export default preview;

export const tags = ['autodocs'];
