'use client'
import React, { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import { useAccount, WagmiProvider, createConfig } from 'wagmi';
import { metaMask } from 'wagmi/connectors'
export const NFTMarketplaceContext = React.createContext();
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
import { NFTMarketplaceAbi, NFTMarketplaceAddress } from './constans';

const config = createConfig({
  connectors: [
    metaMask()
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
  ],
  ssr: true,
})

const queryClient = createQueryClient();

// IPFS config
const fetchContract = (signerOrProvider) => {
  const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceAbi, signerOrProvider);
  return contract;
};

// connecting with smart contract
const connectToContract = async (signer) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log({signer});
    
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
  }
};




function MarketplaceContent({ children }) {
  const titleData = 'Hero Section Title';
  const { address, isConnecting, isDisconnected } = useAccount();

  // useEffect(() => {
  //   let account = '-'
  //   try {
  //     if (!window.ethereum) return 'Install MetaMask';
      
  //     const accounts = window.ethereum.request({ method: 'eth_accounts' })
  //       .then(accounts => {
  //         console.log('metamask-address: ', accounts[0]);
  //       })
  //   } catch (error) {
  //     console.error("Error checking wallet connection:", error);
  //   }
  // }, [address]);

  const checkContract = async () => {
    const contract = await connectToContract();
    if (!contract) {
      console.log('---- there isn\'t contract')
      return
    };

    // Check if the contract is deployed
    const contractAddress = await contract.getAddress();
    const contractInterface = await contract.interface
    console.log({contract, contractInterface});
    
    console.log("Contract address:", contractAddress);
  }

  const checkIfWalletConnected = () => {
    if (isConnecting) return 'Connecting...';
    if (isDisconnected) return 'Wallet Not Connected';

    return `Wallet Connected: ${address}`;
  }

  return (
    <NFTMarketplaceContext.Provider value={{ titleData, checkContract, checkIfWalletConnected, address, isConnecting, isDisconnected }}>
      {children}
    </NFTMarketplaceContext.Provider>    
  );
}

export function NFTMarketplaceProvider({children}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider> */}
          <MarketplaceContent>
            {children}
          </MarketplaceContent>
        {/* </RainbowKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}