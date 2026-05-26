'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

import Style from './nftDetails.module.css'
import { Button, Category, Brand } from '@/components/ComponentIndex'
import { NFTDescription, NFTDetailsImg, NFTTabs } from './components/index'

// import smart contract data
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

const Page = () => {
  const { address, isConnecting, isDisconnected, walletClient } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nftData, setNftData] = useState({
    image: '',
    name: '',
    owner: '',
    price: '',
    seller: '',
    tokenId: '',
    description: '',
    tokenUri: '',
  });

  useEffect(() => {
    // Get data from URL search parameters
    const params = {
      tokenId: searchParams.get('tokenId') || '',
      name: searchParams.get('name') || '',
      price: searchParams.get('price') || '',
      image: searchParams.get('image') || '',
      seller: searchParams.get('seller') || '',
      owner: searchParams.get('owner') || '',
      description: searchParams.get('description') || '',
      tokenUri: searchParams.get('tokenUri') || '',
    };
    
    console.log('NFTDetailsPage received URL params:', params);
    setNftData(params);
  }, [searchParams]);

  return (
    <div>
      <div className={Style.NFTDetailsPage}>
        <div className={Style.NFTDetailsPage_box}>
          <NFTDetailsImg nftData={nftData} />
          <NFTDescription nftData={nftData} />
        </div>
      </div>
      <Category />
      <Brand />
    </div>
  )
}

export default Page

