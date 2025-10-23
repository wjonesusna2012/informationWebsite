// src/msw.tsx
import { AppRouter } from '@info/schemas'; // Adjust this import to your project
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import SuperJSON from 'superjson';

export const api = createTRPCContext<AppRouter>();

const baseUrl = 'http://localhost:3000'; // Your API base URL

export const TRPCReactProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpLink({
          url: baseUrl,
          transformer: SuperJSON
        })
      ]
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </api.TRPCProvider>
    </QueryClientProvider>
  );
};
