'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
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
import { json } from '@helia/json';
import axios from 'axios';
import { unixfs } from '@helia/unixfs';
import { create } from 'ipfs-http-client';

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
    console.log('connectToContract...');
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log({ signer });

    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
  }
};



function MarketplaceContent({ children }) {
  const titleData = 'Hero Section Title';
  const { address, isConnecting, isDisconnected } = useAccount();
  // const [helia, setHelia] = useState(null);
  // const [heliaJson, setHeliaJson] = useState(null);

  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


  // useEffect(() => {
  //   const initHelia = async () => {
  //     if (helia) return;
  //     try {
  //       const heliaNode = await createHelia({
  //         // Configuración básica para navegador
  //         libp2p: {
  //           addresses: {
  //             listen: []
  //           }
  //         }
  //       });
  //       const j = json(heliaNode);
  //       setHelia(heliaNode);
  //       setHeliaJson(j);
  //       console.log('Helia IPFS node initialized successfully');

  //     } catch (error) {
  //       console.error('Error initializing Helia IPFS node:', error);
  //       setHelia(null);
  //       setHeliaJson(null);
  //     }
  //   };
  //   initHelia();
  // }, []);
  
   const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const checkContract = async () => {
    const contract = await connectToContract();
    console.log('contract-connected');
    checkIfWalletConnected()
    
    if (!contract) {
      console.log('---- there isn\'t contract')
      return
    };

    // Check if the contract is deployed
    const contractAddress = await contract.getAddress();
    const contractInterface = await contract.interface
    console.log({ contract, contractInterface });

    console.log("Contract address:", contractAddress);
  }

  const checkIfWalletConnected = () => {
    if (isConnecting) return 'Connecting...';
    if (isDisconnected) return 'Wallet Not Connected';

    return `Wallet Connected: ${address}`;
  }


  const uploadToIPFS = async (image, name, description) => {
    console.log('uploadToIPFS called with:', { image, name, description });
    
    if (!image || !name || !description) {
      console.error('Missing required data for IPFS upload');
      return;
    }

    try {
      // 1. Subir imagen a IPFS
      const imageBuffer = await image.arrayBuffer();
      const imageResult = await client.add(new Uint8Array(imageBuffer));
      const imageUrl = `ipfs://${imageResult.path}`;
      console.log('Image uploaded to IPFS:', imageUrl);

      // 2. Crear y subir metadatos JSON
      const metadata = {
        name,
        description,
        image: imageUrl,
      };

      const metadataResult = await client.add(JSON.stringify(metadata));
      const metadataUrl = `ipfs://${metadataResult.path}`;
      console.log('Metadata uploaded to IPFS:', metadataUrl);

      return metadataUrl;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  }

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return console.log('Missing data');

    try {
      // Ya no necesitas usar heliaJson, usa el cliente de Infura
      const data = JSON.stringify({ name, description, image: fileUrl });
      const added = await client.add(data);
      const url = `ipfs://${added.path}`;
      console.log('Metadata URL:', url);
      await createSale(url, price);
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
    }
  }

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.parseUnits(formInputPrice, 'ether');
      const contract = await connectToContract();
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, { value: listingPrice.toString() })
        : await contract.reSellToken(id, price, { value: listingPrice.toString() });

    } catch (error) {
      console.error('Error creating sale:', error);
    }
  }

  const fetchNFTs = async () => {
    try {
      const contract = await connectToContract();
      const data = await contract.fetchMarketItem();

      const items = await Promise.all(data.map(async i => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const {
          data: {image, name, description}
        } = await axios.get(tokenUri);

        // const meta = await axios.get(tokenUri);
        let price = ethers.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: tokenUri,
          name,
          description,
          tokenUri
        };
        return item;
      }));
      return items;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  }

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectToContract();
      const data = type === 'fetchItemsListed'
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

      const items = await Promise.all(data.map(async i => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const {
          data: {image, name, description}
        } = await axios.get(tokenUri);

        let price = ethers.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: tokenUri,
          name,
          description,
          tokenUri
        };
        return item;
      }));
      return items;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  }

  const buyNFT = async (nft) => {
    try {
      const contract = await connectToContract();
      const price = ethers.parseUnits(nft.price.toString(), 'ether');
      const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
      await transaction.wait();
      console.log('NFT purchased successfully');
    } catch (error) {
      console.log('Error while buying NFT: ', error);
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
      uploadToIPFS,
      createNFT,
      fetchNFTs,
      fetchMyNFTsOrListedNFTs,
      buyNFT,
    }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
}

export function NFTMarketplaceProvider({ children }) {
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