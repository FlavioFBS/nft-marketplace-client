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
    console.log({ contract, contractInterface });

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

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return console.log('Missing data');

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await heliaJson.add(data);
      const url = `ipfs://${added.toString()}`;
      // const url = `http://ipfs.infura.io/ipfs/${added.path}`;
      console.log('Metadata URL: ', url);
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