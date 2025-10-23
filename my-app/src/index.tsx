import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ListNarratives from './ListNarratives';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SuperJSON from 'superjson';
import DisplayNarrative from './DisplayNarrative';
// Import zod first to ensure it's available when schemas package loads
import * as zod from 'zod';
import { type AppRouter } from '@info/schemas';

// Make zod globally available for the schemas package
if (typeof window !== 'undefined') {
  (window as any).zod = zod;
}

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: process.env.REACT_APP_TRPC_URL || 'http://localhost:4000/trpc',
      transformer: SuperJSON
    })
  ]
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: () => <h1>Insert here</h1>
      },
      {
        path: '/listNarratives',
        Component: ListNarratives
      },
      {
        path: '/narrative/:narrativeId',
        Component: DisplayNarrative
      }
    ]
  }
]);

const rootNode = document.getElementById('root');
const root = createRoot(rootNode as Element);
root.render(
  <React.StrictMode>
    <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <div
          style={{
            marginLeft: '5.5rem',
            transform: 'scale(.7)',
            transformOrigin: 'bottom left'
          }}
        >
          <ReactQueryDevtools initialIsOpen position="bottom" />
        </div>
      </QueryClientProvider>
    </TRPCProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
