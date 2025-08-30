import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || 'https://eth.llamarpc.com'),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://polygon.llamarpc.com'),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || 'https://optimism.llamarpc.com'),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || 'https://arbitrum.llamarpc.com'),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://base.llamarpc.com'),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.public.blastapi.io'),
  },
  batch: {
    multicall: {
      batchSize: 1024,
      wait: 16,
    },
  },
  ssr: true,
  syncConnectedChain: true,
});

export const rainbowConfig = getDefaultConfig({
  appName: 'NFT-Marketplace',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  appDescription: 'NFT Marketplace',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  appIcon: 'https://avatars.githubusercontent.com/u/your-avatar',
});
