import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Root from './App';
import reportWebVitals from './reportWebVitals';
import AddNarrativeDialog from './AddNarrativeDialog'; 
import AddStoryDialog from './AddStoryDialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from '@info/server';

export const trpc = createTRPCReact<AppRouter>({});
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
      // optional
      headers() {
        return {
          // authorization: getAuthCookie(),
        }
      },
    }),
  ],
})
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        path: '/',
        Component: () =>  <h1>Insert here</h1>,
      },
      {
        path: '/narratives',
        Component: AddNarrativeDialog,
      },
      {
        path: '/stories',
        Component: AddStoryDialog,
      }
    ]
  }
])

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
