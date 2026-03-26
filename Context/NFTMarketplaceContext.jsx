'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, WagmiProvider, createConfig, http, useWalletClient, useConnect, useSwitchChain } from 'wagmi';
import { metaMask } from 'wagmi/connectors'
export const NFTMarketplaceContext = React.createContext();
import {
  sepolia,
} from 'wagmi/chains';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/config/queryClient';
import { NFTMarketplaceAbi, NFTMarketplaceAddress } from './constans';
import axios from 'axios';

// Wagmi config
const config = createConfig({
  connectors: [
    metaMask()
  ],
  chains: [
    sepolia, // temporal for development
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_INFURA_SEPOLIA_RPC),
  },
  ssr: true,
})

const queryClient = createQueryClient();

const fetchContract = (signerOrProvider) => {
  const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceAbi, signerOrProvider);
  return contract;
};

function MarketplaceContent({ children }) {
  const titleData = 'Hero Section Title';
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connect } = useConnect();
  const { switchChain } = useSwitchChain();

  const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const pinataSecretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

  const switchToSepolia = async () => {
    try {
      console.log('🔄 Switching to Sepolia network...');
      await switchChain({ chainId: sepolia.id });
      console.log('✅ Successfully switched to Sepolia');
      return true;
    } catch (error) {
      console.error('❌ Failed to switch network:', error);
      
      // Error by user rejection
      if (error.code === 4001) {
        console.log('ℹ️ User rejected network switch');
      }
      return false;
    }
  };

  useEffect(() => {
    if (address && !isDisconnected && walletClient) {
      console.log('👍 Wallet connected, auto-checking contract...');
      checkContract();
    }
  }, [address, isDisconnected, walletClient]);


  const connectWallet = async () => {
    try {
      console.log('🔌 Connecting wallet...');
      await connect({ connector: metaMask() });
      console.log('✅ Wallet connection initiated');
    } catch (error) {
      console.error('❌ Failed to connect wallet:', error);
    }
  };

  const checkContract = async () => {
    try {
      console.log('🔍 checkContract called. Current state:', {
        address,
        isConnecting,
        isDisconnected,
        hasWalletClient: !!walletClient
      });

      if (!address || isDisconnected || !walletClient) {
        console.log('⏳ Wallet not ready yet. Skipping contract check.');
        return;
      }

      const contract = await connectToContract();
      console.log('✅ Contract connected successfully');
      
      if (!contract) {
        console.log('❌ Contract connection failed')
        return
      };

      // Check if the contract is deployed
      const contractAddress = await contract.getAddress();
      console.log("📄 Contract confirmed at address:", contractAddress);
    } catch (error) {
      console.error('❌ checkContract failed:', error);
    }
  };

  const connectWalletAndCheck = async () => {
    try {
      if (!address || isDisconnected) {
        console.log('🔌 No wallet connected, connecting first...');
        await connectWallet();
        
        setTimeout(() => {
          console.log('⏰ Re-checking after wallet connection...');
          checkContract();
        }, 1000);
      } else {
        console.log('👍 Wallet already connected, checking contract...');
        await checkContract();
      }
    } catch (error) {
      console.error('❌ connectWalletAndCheck failed:', error);
      
      if (error.message.includes('Wrong network')) {
        alert(`❌ Network Error: ${error.message}`);
      }
    }
  };

  const connectToContract = async () => {
    try {
      console.log('🔗 connectToContract called');
      console.log('📊 Wallet state:', {
        address,
        isConnecting,
        isDisconnected,
        hasWalletClient: !!walletClient
      });
      
      if (!walletClient) {
        const error = 'Wallet client not available. Please connect your wallet.';
        console.error('❌', error);
        throw new Error(error);
      }

      if (!address) {
        const error = 'No account address available. Please ensure wallet is connected.';
        console.error('❌', error);
        throw new Error(error);
      }

      if (isDisconnected) {
        const error = 'Wallet is disconnected. Please reconnect your wallet.';
        console.error('❌', error);
        throw new Error(error);
      }

      console.log('✅ All wallet checks passed. Proceeding with contract connection...');

      let provider = new ethers.BrowserProvider(walletClient.transport);
      
      const network = await provider.getNetwork();
      console.log('🌐 Network info:', {
        name: network.name,
        chainId: network.chainId.toString(),
        expectedChainId: sepolia.id,
        isCorrectNetwork: network.chainId === BigInt(sepolia.id)
      });
      
      if (network.chainId !== BigInt(sepolia.id)) {
        console.warn('⚠️ Wrong network! Expected Sepolia (11155111), got:', network.chainId.toString());
        console.log('🔄 Attempting to switch to Sepolia...');
        
        const switched = await switchToSepolia();
        if (!switched) {
          throw new Error(`Wrong network! Please switch to Sepolia testnet manually. Current: ${network.name} (${network.chainId}), Expected: Sepolia (${sepolia.id})`);
        }
        
        provider = new ethers.BrowserProvider(walletClient.transport);
        const newNetwork = await provider.getNetwork();
        console.log('✅ Network after switch:', {
          name: newNetwork.name,
          chainId: newNetwork.chainId.toString()
        });
      }
      
      const signer = await provider.getSigner(address);
      const signerAddress = await signer.getAddress();
      
      console.log('✅ Signer details:', {
        expectedAddress: address,
        signerAddress: signerAddress,
        addressMatch: address.toLowerCase() === signerAddress.toLowerCase()
      });

      const contract = fetchContract(signer);
      console.log('📄 Contract instance created for:', NFTMarketplaceAddress);
      
      // Basic test: Check if contract responds
      console.log('🧪 Testing basic contract connection...');
      const contractAddress = await contract.getAddress();
      console.log('✅ Contract responds! Address confirmed:', contractAddress);
      
      return contract;
    } catch (error) {
      console.error("❌ connectToContract error:", error);
      throw error;
    }
  };

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

    if (!pinataApiKey || !pinataSecretKey) {
      console.error('Pinata API keys not configured');
      return;
    }

    try {
      console.log('🎯 Uploading to Pinata IPFS...');
      console.log('📄 File info:', {
        name: image.name,
        size: (image.size / 1024 / 1024).toFixed(2) + ' MB',
        type: image.type
      });
      
      // 1. Upload image to Pinata
      const imageFormData = new FormData();
      imageFormData.append('file', image);
      
      const imageOptions = JSON.stringify({
        cidVersion: 0,
      });
      imageFormData.append('pinataOptions', imageOptions);

      const imageResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretKey,
        },
        body: imageFormData,
      });

      if (!imageResponse.ok) {
        throw new Error(`Image upload failed: ${imageResponse.statusText}`);
      }

      const imageResult = await imageResponse.json();
      const imageUrl = `ipfs://${imageResult.IpfsHash}`;
      console.log('✅ Image uploaded to IPFS:', imageUrl);
      console.log('🌐 View at:', `https://gateway.pinata.cloud/ipfs/${imageResult.IpfsHash}`);

      // 2. Create and upload JSON metadata to Pinata
      const metadata = {
        name,
        description,
        image: imageUrl,
      };

      const metadataResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretKey,
        },
        body: JSON.stringify(metadata),
      });

      if (!metadataResponse.ok) {
        throw new Error(`Metadata upload failed: ${metadataResponse.statusText}`);
      }

      const metadataResult = await metadataResponse.json();
      const metadataUrl = `ipfs://${metadataResult.IpfsHash}`;
      console.log('✅ Metadata uploaded to IPFS:', metadataUrl);
      console.log('🌐 View at:', `https://gateway.pinata.cloud/ipfs/${metadataResult.IpfsHash}`);

      return {
        imageUrl,
        metadataUrl,
        imageCid: imageResult.IpfsHash,
        metadataCid: metadataResult.IpfsHash
      };
    } catch (error) {
      console.error('❌ Error uploading to IPFS:', error);
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.error('🚫 Network error. Check your internet connection and Pinata API keys.');
      }
    }
  }

  const createNFT = async (name, price, fileUrl, description, router) => {
    console.log('Creating NFT with:', { name, price, fileUrl, description });
    
    if (!name || !description || !price || !fileUrl) {
      console.log('Missing data for NFT creation');
      return;
    }

    try {
      console.log('Starting NFT creation process...');
      // fileUrl already contains the IPFS metadata URL
      await createSale(fileUrl, price);
      console.log('NFT created successfully!');
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  }

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log('💰 Starting createSale...', {
        url,
        price: formInputPrice,
        isReselling: !!isReselling,
        tokenId: id
      });
      
      // Verify that we have a wallet connected before proceeding
      if (!address || isDisconnected || !walletClient) {
        throw new Error('Wallet not connected properly. Please connect your wallet and try again.');
      }
      
      const price = ethers.parseUnits(formInputPrice, 'ether');
      console.log('✅ Price parsed:', price.toString(), 'wei');
      
      const contract = await connectToContract();
      if (!contract) {
        throw new Error('Failed to connect to contract');
      }
      
      // Verify contract details before calling getListingPrice
      console.log('📋 Contract details:');
      console.log('  - Contract address:', await contract.getAddress());
      console.log('  - Signer address:', await contract.runner.getAddress());
      console.log('  - Network:', await contract.runner.provider.getNetwork().then(n => ({ name: n.name, chainId: n.chainId.toString() })));
      
      console.log('💸 Getting listing price from contract...');
      const listingPrice = await contract.getListingPrice();
      console.log('✅ Listing price retrieved:', {
        raw: listingPrice.toString(),
        formatted: ethers.formatEther(listingPrice) + ' ETH'
      });
      
      console.log('Creating transaction...');
      const transaction = !isReselling
        ? await contract.createToken(url, price, { value: listingPrice.toString() })
        : await contract.reSellToken(id, price, { value: listingPrice.toString() });

      console.log('Transaction sent, waiting for confirmation...');
      await transaction.wait();
      console.log('Transaction confirmed!', transaction.hash);
      
      return transaction;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
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
      connectWallet,
      checkContract,
      connectWalletAndCheck,
      switchToSepolia,
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