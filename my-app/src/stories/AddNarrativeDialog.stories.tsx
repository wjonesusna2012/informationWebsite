import { Meta, StoryObj } from '@storybook/react';
import AddNarrativeDialog from '../AddNarrativeDialog';
import {
} from '@tanstack/react-query';
const meta: Meta<typeof AddNarrativeDialog> = {
  title: 'Add Narrative Dialog',
  component: AddNarrativeDialog,
};
export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof AddNarrativeDialog>;
export const GenericAddNarrativeDialog: Story = {
  args: {}
};
