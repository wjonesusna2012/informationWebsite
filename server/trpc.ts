import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { OpenApiMeta } from 'trpc-to-openapi';
import SuperJSON from 'superjson';

// This is a placeholder for your token validation logic.
// In a real app, you'd use a library like 'jsonwebtoken' or an OAuth provider's SDK.
const getUserFromToken = (token: string | undefined) => {
  if (!token) {
    return null;
  }
  // Replace this with actual token verification
  try {
    // const decoded = jwt.verify(token, 'your-secret-key');
    // return { id: decoded.sub, name: 'Test User' };
    if (token === 'dummy-token') {
      return { id: '123', name: 'Test User' };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  const user = getUserFromToken(token);

  return {
    req,
    res,
    user
  };
};

const t = initTRPC.context<typeof createContext>().meta<OpenApiMeta>().create({
  transformer: SuperJSON,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `user` as non-nullable
      user: ctx.user
    }
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);