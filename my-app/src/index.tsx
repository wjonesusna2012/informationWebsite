import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ListNarratives from './ListNarratives';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from '@info/server';
import SuperJSON from 'superjson';
import DisplayNarrative from './DisplayNarrative';

export const trpc = createTRPCReact<AppRouter>({});
const trpcClient = trpc.createClient({
  transformer: SuperJSON,
  links: [
    httpLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
})
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: () =>  <h1>Insert here</h1>,
      },
      {
        path: '/listStories',
        Component: ListStories,
      },
      {
        path: '/listNarratives',
        Component: ListNarratives,
      },
      {
        path: '/narrative/:narrativeId',
        Component: DisplayNarrative 
      }
    ]
  }
])

const rootNode = document.getElementById('root');
const root = createRoot(rootNode as Element);
root.render(
  <React.StrictMode>
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools
            initialIsOpen
            position="bottom-left"
            toggleButtonProps={{
              style: {
                marginLeft: '5.5rem',
                transform: `scale(.7)`,
                transformOrigin: 'bottom left',
              },
            }}
          />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
