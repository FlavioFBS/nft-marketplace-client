'use client'
import React, { useState, useEffect } from 'react';
export const NFTMarketplaceContext = React.createContext();

import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/config/queryClient';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'MetaMask PoC with Rainbow Kit',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'PROJECT_ID',
  wallets,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
  ],
  ssr: true,
});

const queryClient = createQueryClient();

export function NFTMarketplaceProvider({ children }) {
  const titleData = 'sample Title'

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <NFTMarketplaceContext.Provider value={{ titleData }}>
            {children}
          </NFTMarketplaceContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

