import React from 'react';

export interface AnchorInputProps {
  anchorLink: string;
  setAnchorLink: (newAnchorLink: string) => void;
}

export interface AnchorState {
  imgSrc: string;
  description: string;
  title: string;
}

export interface CardAccordianProps {
  summary: string;
  details: string;
  children: Array<React.ReactElement>;
}

export interface MenuInterface {
  anchorElement: HTMLElement | null;
  open: boolean;
  closeHandler: () => void;
}

export interface SelectStoriesProps {
  availableStories: Array<TopicCardData>;
}

export interface TopicCardProps {
  id: number;
  headerTitle: string;
  postTitle: string;
  summary: string;
  date: string;
  selected: boolean;
  toggleStory: (storyID: number) => void;
}
export interface TopicCardData {
  id: number;
  headerTitle: string;
  postTitle: string;
  summary: string;
  date: string;
}

export interface StoryGridProps {
  cardArray: Array<TopicCardProps>;
}
