import { createTRPCMsw } from 'msw-trpc';
import { setupServer } from 'msw/node';
import type { AppRouter } from '@info/server';
import SuperJSON from 'superjson';

export const trpcMsw = createTRPCMsw<AppRouter>({
  basePath: '/api/trpc',
  baseUrl: 'http://localhost:6006',
  transformer: {
    input: SuperJSON,
    output: SuperJSON
  }
});

const server = setupServer(
  trpcMsw.addStory.mutation((input) => {
    return {
      _id: 'Test ID',
      storyTitle: 'Title Test',
      summary: "Lorem Ipsum I forget I don't have internet",
      link: '',
      date: new Date(),
      createdAt: new Date(),
      createdBy: 'Yours Truly'
    };
  }),
  trpcMsw.addNarrative.mutation((input) => {
    return {
      _id: 'Test ID',
      title: 'Title Test',
      summary: "Lorem Ipsum I forget I don't have internet",
      abbreviation: 'EXO2020',
      createdAt: new Date(),
      createdBy: 'Yours Truly'
    };
  }),
  trpcMsw.addTag.mutation((input) => {
    return {
      _id: 'Test ID',
      tagName: input.tagName,
      tagText: input.tagText,
      createdAt: new Date(),
      createdBy: 'Yours Truly'
    };
  })
);

export { server };
