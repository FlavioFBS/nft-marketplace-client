'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import Style from './NFTDetailsImg.module.css'
import img from "@/img";

const NFTDetailsImg = ({nftData}) => {
  const [showDescription, setShowDescription] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [like, setLike] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  console.log('NFTDetailsImg received nftData:', nftData);


  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={handleLikeClick} tabIndex="0" role="button" aria-label="Like this NFT">
              {like ? (
                <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon_} />
              ) : (
                <AiOutlineHeart className={Style.NFTDetailsImg_box_NFT_like_icon_} />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={nftData.image}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onLoad={handleImageLoad}
            />
            {!imageLoaded && (
              <div className={Style.image_loading}>
                <div className={Style.loading_spinner}></div>
              </div>
            )}
          </div>
        </div>

        <div className={Style.NFTDetailsImg_box_description} onClick={() => setShowDescription(!showDescription)}>
          <p>Description</p>
          <span className={`${Style.arrow_icon} ${showDescription ? Style.arrow_up : Style.arrow_down}`}>
            {showDescription ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </span>
        </div>
        {showDescription && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nftData.description}</p>
          </div>
        )}
        <div className={Style.NFTDetailsImg_box_details} onClick={() => setShowDetails(!showDetails)}>
          <p>Details</p>
          <span className={`${Style.arrow_icon} ${showDetails ? Style.arrow_up : Style.arrow_down}`}>
            {showDetails ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </span>
        </div>

        {showDetails && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px IMAGE (698KB)</small>
            <p>
              <small>Contract Address: </small>
              <br />
              {nftData.seller}
            </p>
            <p>
              <small>Token ID: </small>
              {nftData.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTDetailsImg;