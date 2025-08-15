'use client'
import React, { Component, useState, useEffect, useContext } from 'react';
import {ethers} from 'ethers'
import Router from 'next/router';

import { NFTMarketplaceAddress, NFTMarketplaceAbi } from './constans';

const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  

  return (
    <NFTMarketplaceContext.Provider value={{}}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};

export default NFTMarketplaceContext;
