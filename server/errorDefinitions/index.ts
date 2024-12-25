import { TRPCError } from '@trpc/server';

export const generateMongoQueryError: (
  message: string,
  stackTrace?: string
) => TRPCError = (message, stackTrace) => {
  return new TRPCError({
    message,
    code: 'BAD_REQUEST',
    ...(!!stackTrace ? { stackTrace } : {})
  });
};

export const generateUserAccessError: (
  message: string,
  stackTrace?: string
) => TRPCError = (message, stackTrace) => {
  return new TRPCError({
    message,
    code: 'FORBIDDEN',
    ...(!!stackTrace ? { stackTrace } : {})
  });
};

export const generateResourceNotFoundError: (
  message: string,
  stackTrace?: string
) => TRPCError = (message, stackTrace) => {
  return new TRPCError({
    message,
    code: 'NOT_FOUND',
    ...(!!stackTrace ? { stackTrace } : {})
  });
};
