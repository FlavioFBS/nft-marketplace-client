'use client';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import Image from 'next/image';

import Style from './NFTCard.module.css';
import images from '@/img';

const NFTCard = () => {
    const featureArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [like, setLike] = useState(true);

    return (
        <div className={Style.nftCard}>
            {featureArray.map((el, i) => (
                <div className={Style.nftCard_box} key={i + 1}>

                    <div className={Style.nftCard_box_update}>
                        <div className={Style.nftCard_box_update_left}>
                            <div className={Style.nftCard_box_update_left_like} onClick={() => setLike(!like)}>
                                {like ? (
                                    <AiFillHeart fill='#fff' />
                                ) : (
                                    <AiOutlineHeart fill='#fff' className={Style.nftCard_box_update_left_like_icon} />
                                )}
                                {""} 22
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
                            src={images.nft_image_1}
                            alt='NFT Images'
                            width={350}
                            height={350}
                            className={Style.nftCard_box_img_img}
                        />
                    </div>



                    <div className={Style.nftCard_box_update_details}>
                        <div className={Style.nftCard_box_update_details_price}>
                            <div className={Style.nftCard_box_update_details_price_box}>
                                <h4>Clone #173173</h4>

                                <div className={Style.nftCard_box_update_details_price_box_box}>
                                    <div className={Style.nftCard_box_update_details_price_box_box_bid}>
                                        <fieldset>
                                            <legend>Current Bid</legend>
                                            <p>0.54 ETH</p>
                                        </fieldset>
                                    </div>
                                    <div className={Style.nftCard_box_update_details_price_box_stock}>
                                        <p>61 in stock</p>
                                    </div>
                                    <div className={Style.nftCard_box_update_details_category}>
                                        <BsImages />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NFTCard