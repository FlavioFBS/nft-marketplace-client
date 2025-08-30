import { QueryClient } from '@tanstack/react-query';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 2000,
    },
  },
};

export const createQueryClient = () => new QueryClient(queryClientConfig);

export const queryKeys = {
  wallet: {
    all: ['wallet'],
    balance: (address, chainId) =>
      [...queryKeys.wallet.all, 'balance', address, chainId],
    nfts: (address, chainId) =>
      [...queryKeys.wallet.all, 'nfts', address, chainId],
    transactions: (address, chainId) =>
      [...queryKeys.wallet.all, 'transactions', address, chainId],
  },
  contracts: {
    all: ['contracts'],
    read: (address, functionName, args) =>
      [...queryKeys.contracts.all, 'read', address, functionName, args],
  },
  tokens: {
    all: ['tokens'],
    balance: (tokenAddress, userAddress, chainId) =>
      [...queryKeys.tokens.all, 'balance', tokenAddress, userAddress, chainId],
  },
};
