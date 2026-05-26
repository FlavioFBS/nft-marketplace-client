'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { BsImage } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { MdTimer, MdVerified } from 'react-icons/md'
import Link from 'next/link'

import Style from './NFTCardCollection.module.css'
import { LikeProfile } from '@/components/ComponentIndex'
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'
import images from '@/img'

const NFTCardCollection = ({ NFTData }) => {
	const { fetchNFTs, address } = useContext(NFTMarketplaceContext);
	const [like, setLike] = useState(false)
	const [likeInc, setLikeInc] = useState(21)
	const [realNFTs, setRealNFTs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [imageErrors, setImageErrors] = useState({});
	const [imageLoading, setImageLoading] = useState({});
	const [imageDimensions, setImageDimensions] = useState({});

	useEffect(() => {
		if (!NFTData || NFTData.length === 0) {
			loadRealNFTs();
		}
	}, [NFTData, address]);

	const loadRealNFTs = async () => {
		try {
			setLoading(true);
			console.log('🔍 Loading real NFTs for collection...');
			const fetchedNFTs = await fetchNFTs();

			if (fetchedNFTs && fetchedNFTs.length > 0) {
				console.log('✅ Real NFTs loaded:', fetchedNFTs.length);
				setRealNFTs(fetchedNFTs);
			} else {
				console.log('ℹ️ No real NFTs found');
				setRealNFTs([]);
			}
		} catch (error) {
			console.error('❌ Error loading real NFTs:', error);
			setRealNFTs([]);
		} finally {
			setLoading(false);
		}
	};

	const handleIPFSUrl = (url) => {
		// Add type checking to prevent errors
		if (!url || typeof url !== 'string') {
			console.warn('Invalid URL passed to handleIPFSUrl:', url);
			return images.nft_image_1; // Return fallback image
		}

		if (url.startsWith('ipfs://')) {
			return url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
		}
		return url;
	};

	const handleImageError = (tokenId, imageUrl) => {
		console.error('Image load error for:', imageUrl);
		setImageErrors(prev => ({ ...prev, [tokenId]: true }));
		setImageLoading(prev => ({ ...prev, [tokenId]: false }));
	};

	const handleImageLoad = (tokenId, event) => {
		const img = event.target;
		const naturalWidth = img.naturalWidth;
		const naturalHeight = img.naturalHeight;

		// Store image dimensions for smart rendering decisions
		setImageDimensions(prev => ({
			...prev,
			[tokenId]: {
				width: naturalWidth,
				height: naturalHeight,
				aspectRatio: naturalWidth / naturalHeight
			}
		}));

		setImageLoading(prev => ({ ...prev, [tokenId]: false }));
		console.log(`📐 Image ${tokenId} loaded:`, { width: naturalWidth, height: naturalHeight });
	};

	const getImageClassName = (tokenId) => {
		const containerSize = 300;
		const dimensions = imageDimensions[tokenId];

		let className = Style.NFTCardCollection_box_img_img;

		if (dimensions) {
			const { width, height } = dimensions;

			if (width <= containerSize && height <= containerSize) {
				className += ' small-image';
			} else {
				className += ' large-image';
			}
		}

		return className;
	};

	const handleImageLoadStart = (tokenId) => {
		setImageLoading(prev => ({ ...prev, [tokenId]: true }));
	};

	const getImageSrc = (imageUrl, tokenId) => {
		if (imageErrors[tokenId]) {
			return images.nft_image_1;
		}
		return imageUrl;
	};

	const likeNft = () => {
		setLikeInc(like ? likeInc + 1 : likeInc - 1)
		setLike(!like)
	}

	const displayData = NFTData && NFTData.length > 0 ? NFTData : realNFTs;

	const isRealNFTData = displayData.length > 0 && displayData[0] &&
		typeof displayData[0] === 'object' && displayData[0].hasOwnProperty('name');

	if (loading) {
		return (
			<div className={Style.NFTCardCollection}>
				<div className={Style.NFTCardCollection_box}>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '200px',
						background: '#f0f0f0',
						borderRadius: '10px'
					}}>
						Loading NFT Collection...
					</div>
				</div>
			</div>
		);
	}

	if (displayData.length === 0) {
		return (
			<div className={Style.NFTCardCollection}>
				<div style={{ textAlign: 'center', padding: '40px' }}>
					<p>No NFTs found in this collection</p>
				</div>
			</div>
		);
	}

	return (
		<div className={Style.NFTCardCollection}>
			{displayData.map((el, i) => {
				const baseImageUrl = isRealNFTData ? handleIPFSUrl(el.image) : el;
				const nftName = isRealNFTData ? el.name : `Clone #${i + 1}`;
				const nftPrice = isRealNFTData ? `${el.price} ETH` : '0.54 ETH';
				const tokenId = isRealNFTData ? el.tokenId : i + 1;
				const finalImageUrl = getImageSrc(baseImageUrl, tokenId);

				// Create URL with search parameters
				const nftDetailsUrl = `/NFT-details?${new URLSearchParams({
					tokenId: String(tokenId),
					name: nftName,
					price: isRealNFTData ? String(el.price) : '0.54',
					image: finalImageUrl,
					seller: isRealNFTData ? String(el.seller || '') : '',
					owner: isRealNFTData ? String(el.owner || '') : '',
					description: isRealNFTData ? String(el.description || '') : `This is Clone #${i + 1}`,
					tokenUri: isRealNFTData ? String(el.tokenUri || '') : ''
				}).toString()}`;

			return (
				<Link href={nftDetailsUrl} key={i}>
						<div className={Style.NFTCardCollection_box} key={isRealNFTData ? `nft-${tokenId}` : `static-${i}`}>
							<div className={Style.NFTCardCollection_box_like}>
								<div className={Style.NFTCardCollection_box_like_box}>
									<div className={Style.NFTCardCollection_box_like_box_box}>
										<BsImage className={Style.NFTCardCollection_box_like_box_box_icon} />
										<p onClick={() => likeNft()}>
											{like ? <AiOutlineHeart /> : <AiFillHeart />} {""}
											<span>{likeInc + 1}</span>
										</p>
									</div>
								</div>
							</div>

							<div className={Style.NFTCardCollection_box_img}>
								{imageLoading[tokenId] && (
									<div style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										zIndex: 2,
										color: '#666',
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										padding: '5px 10px',
										borderRadius: '5px',
										fontSize: '0.9rem'
									}}>
										Loading...
									</div>
								)}
								<Image
									src={finalImageUrl}
									alt={`NFT ${nftName}`}
									fill
									className={getImageClassName(tokenId)}
									sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
									onLoadStart={() => handleImageLoadStart(tokenId)}
									onLoad={(e) => handleImageLoad(tokenId, e)}
									onError={() => handleImageError(tokenId, baseImageUrl)}
									priority={i < 4} // Priority for first 4 images
									placeholder="blur"
									blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
								/>
							</div>

							<div className={Style.NFTCardCollection_box_info}>
								<div className={Style.NFTCardCollection_box_info_left}>
									<LikeProfile />
									<p>{nftName}</p>
									<small>{isRealNFTData ? `Token #${tokenId}` : `4${i + 2}`}</small>
								</div>
							</div>

							<div className={Style.NFTCardCollection_box_price}>
								<div className={Style.NFTCardCollection_box_price_box}>
									<small>Current Price</small>
									<p>{nftPrice}</p>
								</div>
								<p className={Style.NFTCardCollection_box_price_stock}>
									<MdTimer />
									<span>{isRealNFTData ? 'Available' : `${i + 1} hours left`}</span>
								</p>
							</div>
						</div>
					</Link>
				)
			})}

			{!NFTData && realNFTs.length > 0 && (
				<div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
					<p>✅ Showing {realNFTs.length} NFTs from marketplace</p>
				</div>
			)}
		</div>
	);
}

export default NFTCardCollection