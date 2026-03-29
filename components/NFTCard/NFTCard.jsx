'use client';
import React, { useState, useEffect, useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import Image from 'next/image';

import Style from './NFTCard.module.css';
import images from '@/img';
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext';

const NFTCard = () => {
    const { fetchNFTs, address } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(true);

    const featureArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_2,
        images.nft_image_1,
        images.nft_image_3,
    ];

    useEffect(() => {
        loadNFTs();
    }, [address]);

    const loadNFTs = async () => {
        try {
            setLoading(true);
            console.log('🔍 Loading NFTs from blockchain...');
            const fetchedNFTs = await fetchNFTs();
            
            if (fetchedNFTs && fetchedNFTs.length > 0) {
                console.log('✅ NFTs loaded:', fetchedNFTs.length);
                setNfts(fetchedNFTs);
            } else {
                console.log('ℹ️ No NFTs found, using fallback data');
                setNfts([]);
            }
        } catch (error) {
            console.error('❌ Error loading NFTs:', error);
            setNfts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleIPFSUrl = (url) => {
        if (url?.startsWith('ipfs://')) {
            return url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
        }
        return url || images.nft_image_1;
    };

    if (loading) {
        return (
            <div className={Style.nftCard}>
                <div className={Style.nftCard_box}>
                    <div className={Style.nftCard_box_img}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            background: '#f0f0f0',
                            borderRadius: '10px'
                        }}>
                            Loading NFTs...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const displayData = nfts.length > 0 ? nfts.slice(0, 8) : featureArray; // Limit to 8 for display

    return (
        <div className={Style.nftCard}>
            {displayData.map((el, i) => {
                console.log({nft_data: el});
                
                // Handle both real NFT data and fallback static images
                const isRealNFT = nfts.length > 0;
                const imageUrl = isRealNFT ? handleIPFSUrl(el.image) : el;
                const nftName = isRealNFT ? el.name : `Clone #${173173 + i}`;
                const nftPrice = isRealNFT ? `${el.price} ETH` : '0.54 ETH';
                const tokenId = isRealNFT ? el.tokenId : i + 1;
                
                return (
                    <div className={Style.nftCard_box} key={isRealNFT ? `nft-${tokenId}` : `static-${i}`}>

                        <div className={Style.nftCard_box_update}>
                            <div className={Style.nftCard_box_update_left}>
                                <div className={Style.nftCard_box_update_left_like} onClick={() => setLike(!like)}>
                                    {like ? (
                                        <AiFillHeart fill='#fff' />
                                    ) : (
                                        <AiOutlineHeart fill='#fff' className={Style.nftCard_box_update_left_like_icon} />
                                    )}
                                    {""} 25
                                </div>
                            </div>

                            <div className={Style.nftCard_box_update_right}>
                                <div className={Style.nftCard_box_update_right_info}>
                                    <small>Remaining Time</small>
                                    <p>12h : 34m : 23s</p>
                                </div>
                            </div>
                        </div>

                        <div className={Style.nftCard_box_img}>
                            <Image
                                src={imageUrl}
                                alt={`NFT ${nftName}`}
                                fill
                                sizes='100vw'
                                className={Style.nftCard_box_img_img}
                            />
                        </div>

                        <div className={Style.nftCard_box_update_details}>
                            <div className={Style.nftCard_box_update_details_price}>
                                <div className={Style.nftCard_box_update_details_price_box}>
                                    <h4>{nftName}</h4>

                                    <div className={Style.nftCard_box_update_details_price_box_box}>
                                        <div className={Style.nftCard_box_update_details_price_box_box_bid}>
                                            <fieldset>
                                                <legend>Current Bid</legend>
                                                <p>{nftPrice}</p>
                                            </fieldset>
                                        </div>
                                        <div className={Style.nftCard_box_update_details_price_box_stock}>
                                            <p>{isRealNFT ? 'On Sale' : '61 in stock'}</p>
                                        </div>
                                        <div className={Style.nftCard_box_update_details_category}>
                                            <BsImages />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {/* Show status message */}
            {!loading && (
                <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                    {nfts.length > 0 ? (
                        <p>✅ Showing {nfts.length} NFTs from marketplace</p>
                    ) : (
                        <p>ℹ️ No NFTs found on marketplace, showing demo data</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default NFTCard