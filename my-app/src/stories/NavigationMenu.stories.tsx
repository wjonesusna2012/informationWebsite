import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavigationMenu from '../NavigationMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigation Menu',
  component: NavigationMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavigationMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavigationMenu> = () => <NavigationMenu />;

export const Primary = Template.bind({});
Primary.args = {
};
