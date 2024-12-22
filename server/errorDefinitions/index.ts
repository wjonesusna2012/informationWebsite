import { TRPCError } from '@trpc/server';

export const generateMongoQueryError: (
  message: string,
  stackTrace?: string
) => TRPCError = (message: string, stackTrace) => {
  return new TRPCError({
    message,
    code: 'BAD_REQUEST',
    ...(!!stackTrace ? { stackTrace } : {})
  });
};
