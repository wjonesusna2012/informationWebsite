// import { createTRPCMsw } from 'msw-trpc';
// import { setupServer } from 'msw/node';
// import type { AppRouter } from '@info/server';
// import SuperJSON from 'superjson';
// import { AddNarrativeType } from '@info/schemas';

// export const trpcMsw = createTRPCMsw<AppRouter>({
//   basePath: '/api/trpc',
//   baseUrl: 'http://localhost:6006',
//   transformer: {
//     input: SuperJSON,
//     output: SuperJSON
//   }
// });

// const server = setupServer(
//   trpcMsw.addStory.mutation((input) => {
//     return Promise.resolve({
//       _id: 'Test ID',
//       storyTitle: 'Title Test',
//       summary: "Lorem Ipsum I forget I don't have internet",
//       link: '',
//       date: new Date(),
//       createdAt: new Date(),
//       createdBy: 'Yours Truly',
//       tags: []
//     });
//   }),
//   trpcMsw.addNarrative.mutation((input: AddNarrativeType) => {
//     const narrativeInput = input; 
//     return Promise.resolve({
//       _id: 'Test ID',
//       title: narrativeInput.title,
//       summary: narrativeInput.summary,
//       abbreviation: narrativeInput.abbreviation,
//       createdAt: new Date(),
//       createdBy: 'Yours Truly',
//       tags: []
//     });
//   }),
//   trpcMsw.addTag.mutation((input) => {
//     const tagInput = input as { tagName: string; tagTitle: string };
//     return Promise.resolve({
//       _id: 'Test ID',
//       tagName: tagInput.tagName,
//       tagTitle: tagInput.tagTitle,
//       createdAt: new Date(),
//       createdBy: 'Yours Truly'
//     });
//   })
// );

// export { server };

export {};