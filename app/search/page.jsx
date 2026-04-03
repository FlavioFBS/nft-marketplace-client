'use client'
import React, { useState, useEffect, useContext } from 'react'

import Style from './search.module.css'

import images from '@/img'
import { SearchBar } from './components';
import { Slider, Brand, Filter } from '@/components/ComponentIndex';
import { NFTCardCollection, Banner } from '../collection/components';
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext';

const Page = () => {
  const { fetchNFTs, address, isConnecting, isDisconnected, walletClient } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allNFTs, setAllNFTs] = useState([]); // Store all NFTs for filtering

  const fallbackArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  // Load NFTs only when wallet is connected and ready
  useEffect(() => {
    if (address && !isDisconnected && !isConnecting && walletClient) {
      console.log('👍 Wallet ready, loading NFTs for search...');
      loadSearchNFTs();
    } else {
      console.log('⏳ Wallet not ready yet:', { 
        address: !!address, 
        isDisconnected, 
        isConnecting,
        hasWalletClient: !!walletClient
      });
      setNfts([]);
      setLoading(false);
      
      // If address exists but walletClient is missing, set loading state
      if (address && !isDisconnected && !walletClient) {
        console.log('🔄 Address available but wallet client initializing...');
        setLoading(true);
      }
    }
  }, [address, isDisconnected, isConnecting, walletClient]);

  const loadSearchNFTs = async () => {
    try {
      setLoading(true);
      console.log('🔍 Loading NFTs for search page...');
      console.log({
        address
      });
      
      const fetchedNFTs = await fetchNFTs();
      
      if (fetchedNFTs && fetchedNFTs.length > 0) {
        console.log('✅ Search NFTs loaded:', fetchedNFTs.length);
        setAllNFTs(fetchedNFTs); // Store all NFTs
        setNfts(fetchedNFTs); // Initially show all
      } else {
        console.log('ℹ️ No NFTs found for search, using fallback data');
        // Create fallback NFT objects for consistent search functionality
        const fallbackNFTs = fallbackArray.map((img, index) => ({
          tokenId: index + 1,
          name: `Demo NFT #${index + 1}`,
          price: (Math.random() * 0.9 + 0.1).toFixed(2), // Random price between 0.1-1.0
          image: img, // This is already a proper image path/URL
          description: `This is a demo NFT #${index + 1} for testing search functionality`,
          seller: '0x0000000000000000000000000000000000000000',
          owner: '0x0000000000000000000000000000000000000000',
          tokenUri: img, // Use the same as image for consistency
          isDemo: true
        }));
        setAllNFTs(fallbackNFTs);
        setNfts(fallbackNFTs);
      }
    } catch (error) {
      console.error('❌ Error loading search NFTs:', error);
      setNfts([]);
      setAllNFTs([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    
    if (!searchValue.trim()) {
      // If search is empty, show all NFTs
      setNfts(allNFTs);
      return;
    }
    
    const filteredNFTs = allNFTs.filter(nft => 
      nft.name && nft.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    console.log(`📊 Found ${filteredNFTs.length} NFTs matching "${searchValue}"`);
    setNfts(filteredNFTs);
  };

  // Update search results when allNFTs changes
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [allNFTs]);

  // Determine what data to pass to NFTCardCollection
  const nftDataToPass = nfts;

  return (
    <div className={Style.search}>
      <Banner bannerImage={images.creatorbackground10} />
      <SearchBar 
        onSearch={handleSearch}
        searchValue={searchTerm}
        placeholder="Search NFTs by name..."
      />
      <Filter />
      
      {isDisconnected ? (
        <>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '2rem 2rem',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '15px',
            margin: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#856404', marginBottom: '0.5rem' }}>
                🔌 Connect your wallet to search for real NFTs
              </p>
              <p style={{ color: '#856404', fontSize: '0.9rem' }}>
                Use the "Connect" button in the navigation, or browse demo NFTs below
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem 2rem' }}>
            <p style={{ color: '#6c757d', fontWeight: '500' }}>
              ℹ️ {searchTerm ? `Showing ${nfts.length} demo NFTs matching "${searchTerm}"` : 'Showing demo NFTs - connect wallet to see real marketplace data'}
            </p>
          </div>
          <NFTCardCollection NFTData={nftDataToPass} />
        </>
      ) : (address && !walletClient) ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '2rem 2rem',
          background: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '15px',
          margin: '2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#0c5460', marginBottom: '0.5rem' }}>
              🔄 Initializing wallet connection...
            </p>
            <p style={{ color: '#0c5460', fontSize: '0.9rem' }}>
              Setting up your wallet client, please wait
            </p>
          </div>
        </div>
      ) : loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '4rem 2rem',
          background: '#f8f9fa',
          borderRadius: '15px',
          margin: '2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
              🔍 Searching for NFTs...
            </p>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', padding: '1rem 2rem' }}>
            {searchTerm ? (
              nfts.length > 0 ? (
                <p style={{ color: '#28a745', fontWeight: '500' }}>
                  ✅ Found {nfts.length} NFT{nfts.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </p>
              ) : (
                <p style={{ color: '#f56565', fontWeight: '500' }}>
                  ❌ No NFTs found matching "{searchTerm}"
                </p>
              )
            ) : (
              nfts.length > 0 ? (
                <p style={{ color: '#28a745', fontWeight: '500' }}>
                  ✅ Showing {nfts.length} NFT{nfts.length !== 1 ? 's' : ''} in marketplace
                </p>
              ) : (
                <p style={{ color: '#6c757d', fontWeight: '500' }}>
                  ℹ️ No NFTs found in marketplace
                </p>
              )
            )}
          </div>
          
          {/* Show NFTs or no results message */}
          {nfts.length > 0 ? (
            <NFTCardCollection NFTData={nftDataToPass} />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: '#f8f9fa',
              borderRadius: '15px',
              margin: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: '#666', marginBottom: '1rem' }}>
                {searchTerm ? `No results for "${searchTerm}"` : 'No NFTs available'}
              </h3>
              <p style={{ color: '#999', maxWidth: '400px', margin: '0 auto' }}>
                {searchTerm ? (
                  <>
                    Try searching with different keywords or{' '}
                    <span 
                      style={{ color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => handleSearch('')}
                    >
                      clear search
                    </span>{' '}
                    to see all NFTs
                  </>
                ) : (
                  'Connect your wallet to load NFTs from the marketplace'
                )}
              </p>
            </div>
          )}
        </>
      )}
      
      <Slider />
      <Brand />
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Page