import React from "react";

export interface AnchorInputProps {
  anchorLink: string;
  setAnchorLink: (newAnchorLink: string) => void;
};

export interface AnchorState {
  imgSrc: string;
  description: string;
  title: string;
};

export interface CardAccordianProps {
  summary: string;
  details: string;
  children: Array<React.ReactElement>
};

export interface MenuInterface {
  anchorElement: HTMLElement | null;
  open: boolean;
  closeHandler: () => void;
};

export interface SelectStoriesProps {
  availableStories: Array<TopicCardProps>
};

export interface TopicCardProps {
  headerTitle: string,
  postTitle: string,
  summary: string,
  date: string,
};

export interface StoryGridProps {
  cardArray: Array<TopicCardProps>;
}