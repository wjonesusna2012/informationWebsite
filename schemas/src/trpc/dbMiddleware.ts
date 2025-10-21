import { TRPCError } from '@trpc/server';
import { publicProcedure } from './trpc';
import { client } from '../database';
import type { Db } from 'mongodb';

// Define the extended context type
export type DbContext = {
  db: Db;
};

// Simple middleware function that adds database to context
export const withDb = async (): Promise<Db> => {
  try {
    await client.connect();
    return client.db('NarrativesProject');
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to connect to database',
      cause: error,
    });
  }
};

