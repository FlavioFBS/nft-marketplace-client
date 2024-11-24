'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { BsImage } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { MdTimer, MdVerified } from 'react-icons/md'

import Style from './NFTCardCollection.module.css'
import { LikeProfile } from '@/components/ComponentIndex'

const NFTCardCollection = ({ NFTData }) => {
	const [like, setLike] = useState(false)
	const [likeInc, setLikeInc] = useState(21)


	const likeNft = () => {
		setLikeInc(like ? likeInc + 1 : likeInc - 1)
		setLike(!like)
	}

	return (
		<div className={Style.NFTCardCollection}>
			{NFTData.map((el, i) => (
				<div className={Style.NFTCardCollection_box} key={i + 1}>
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
						<Image
							src={el}
							alt='NFT'
							fill
							sizes='100vw'
							className={Style.NFTCardCollection_box_img_img}
						/>
					</div>

					<div className={Style.NFTCardCollection_box_info}>
						<div className={Style.NFTCardCollection_box_info_left}>
							<LikeProfile />
							<p>Clone #{i + 1}</p>
							<small>4{i + 2}</small>
						</div>
					</div>

					<div className={Style.NFTCardCollection_box_price}>
						<div className={Style.NFTCardCollection_box_price_box}>
							<small>Current Bid</small>
							<p>1{i + 5}.000 ETH</p>
						</div>
						<p className={Style.NFTCardCollection_box_price_stock}>
							<MdTimer />
							<span>{i + 1} hours left</span>
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default NFTCardCollection