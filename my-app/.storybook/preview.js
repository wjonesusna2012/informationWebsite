import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;

export const tags = ["autodocs"];