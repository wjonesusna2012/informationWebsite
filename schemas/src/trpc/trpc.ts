import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import SuperJSON from 'superjson';
import { withDb } from './dbMiddleware';
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

// This is a placeholder for your token validation logic.
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

const consolidateContext = async (
  req: Request,
  res: Response,
  user: ReturnType<typeof getUserFromToken>
) => {
  await client.connect();
  const db = client.db('NarrativesProject');
  return {
    db,
    req,
    res,
    user
  };
};

export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions): Promise<{
  req: typeof req;
  res: typeof res;
  user: ReturnType<typeof getUserFromToken>;
  db: Awaited<ReturnType<typeof withDb>>;
}> => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  const user = getUserFromToken(token);
  const db = await withDb();
  return {
    req,
    res,
    user,
    db
  };
};

const t = initTRPC.context<typeof consolidateContext>().create({
  transformer: SuperJSON
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

export const protectedProcedure: typeof t.procedure =
  t.procedure.use(isAuthenticated);
