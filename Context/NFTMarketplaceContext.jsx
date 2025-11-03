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
import { createHelia } from 'helia';
import { json } from '@helia/json'

// Wagmi config
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
  const [helia, setHelia] = useState(null);
  const [heliaJson, setHeliaJson] = useState(null);

  useEffect(() => {
    const initHelia = async () => {
      if (helia) return;
      try {
        const heliaNode = await createHelia();
        const j = json(heliaNode);
        setHelia(heliaNode);
        setHeliaJson(j);
        console.log('Helia IPFS node initialized');
        
      } catch (error) {
        console.error('Error initializing Helia IPFS node:', error);
      }
    };
    initHelia();
  }, []);

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


  const uploadToIPFS = async (image, name, description) => {
    if (!image || !name || !description) {
      console.error('Missing required data for IPFS upload');
      return
    }
    try {
      // upload image to IPFS
      const imageBuffer = await image.arrayBuffer();
      const imageCid = await helia.blockstore.put(new Uint8Array(imageBuffer));
      const imageUrl = `ipfs://${imageCid.toString()}`;
      console.log('Image uploaded to IPFS: ', imageUrl);
      
      // create and upload metadata JSON
      const metadata = {
        name,
        description,
        image: imageUrl,
      };
      const metadataCid = await heliaJson.add(metadata);
      const metadataUrl = `ipfs://${metadataCid.toString()}`;
      console.log('Metadata uploaded to IPFS: ', metadataUrl);

      return metadataUrl;
    } catch (error) {
      console.error('Error uploading image to IPFS:', error);
    }
  }

  return (
    <NFTMarketplaceContext.Provider value={{ 
      titleData, 
      checkContract, 
      checkIfWalletConnected, 
      address, 
      isConnecting, 
      isDisconnected,
      uploadToIPFS 
    }}>
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