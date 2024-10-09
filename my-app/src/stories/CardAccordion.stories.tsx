import { Meta } from '@storybook/react/*';
import CardAccordion from '../NarrativeAccordian';
import StoryGrid from '../StoryGrid';
import { TopicCardProps } from '../interfaces';

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const meta: Meta<typeof CardAccordion> = {
  title: 'Card Accordion Test',
  component: CardAccordion,
  render: (args) => (
    <CardAccordion {...args}>
      <StoryGrid
        cardArray={range.map((r) => {
          return {
            ...genericArgs,
            id: r,
            headerTitle: `Featured ${r}`
          };
        })}
      />
    </CardAccordion>
  )
};

export default meta;

const genericArgs: TopicCardProps = {
  id: 1,
  headerTitle: 'Featured',
  postTitle: 'This is a test post title',
  summary:
    'Lorem Ipsum Doelr sit net amit. Filler text to make this go on forever',
  date: 'September 21, 2021',
  selected: false,
  toggleStory: () => {}
};

export const DefaultCardAccordian = {
  args: {
    summary: 'Narrative Summary',
    details: 'Details for stuff',
    abbreviation: 'NOGO'
  }
};
