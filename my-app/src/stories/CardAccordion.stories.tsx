import { Meta } from '@storybook/react/*';
import NarrativeAccordion from '../NarrativeAccordian';
import StoryGrid from '../StoryGrid';
import { TopicCardProps } from '../interfaces';

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const meta: Meta<typeof NarrativeAccordion> = {
  title: 'Card Accordion Test',
  component: NarrativeAccordion,
  render: (args) => (
    <NarrativeAccordion {...args}>
      <StoryGrid
        cardArray={range.map((r) => {
          return {
            ...genericArgs,
            id: r,
          };
        })}
      />
    </NarrativeAccordion>
  )
};

export default meta;

const genericArgs: TopicCardProps = {
  id: 1,
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021',
  selected: false,
  toggleStory: () => {}
};

export const DefaultCardAccordian = {
  args: {
    tags: ['Topic 1', 'Really long topic for you'],
    summary: 'Narrative Summary',
    details: 'Details for stuff',
    abbreviation: 'NOGO'
  }
};
