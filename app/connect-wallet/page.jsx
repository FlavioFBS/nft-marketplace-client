'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Style from './connectWallet.module.css';
import img from '@/img';


const Page = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const providerArray = [
    {
      provider: img.walletProviderMetamask,
      name: 'Metamask'
    },
    {
      provider: img.walletProviderWalletConnect,
      name: 'WalletConnect'
    },
    {
      provider: img.walletProviderCoinbase,
      name: 'Coinbase Wallet'
    },
    {
      provider: img.walletProviderFortmatic,
      name: 'Fortmatic'
    }
  ]

  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect Your Wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with one of our available wallet providers or create a new one.
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((item, index) => (
            <div
              key={index}
              className={`${Style.connectWallet_box_provider_item} ${activeBtn === index ? Style.active : ''}`}
              onClick={() => setActiveBtn(index)}
            >
              <Image src={item.provider} alt={item.name} className={Style.connectWallet_box_provider_item_img} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Page;