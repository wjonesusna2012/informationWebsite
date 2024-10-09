import { Meta, StoryObj } from '@storybook/react';
import NavigationMenu from '../NavigationMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation Menu',
  component: NavigationMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof NavigationMenu>;
export const GenericNavigationMenu: Story = {
  args: {}
};
