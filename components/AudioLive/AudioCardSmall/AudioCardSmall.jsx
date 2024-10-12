import React, { useState } from 'react'
import Image from 'next/image'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { TbPlayerPause, TbPlayerPlay } from 'react-icons/tb'

import Style from './AudioCardSmall.module.css'
import images from '@/img'
import { LikeProfile } from '@/components/ComponentIndex'

const AudioCardSmall = () => {
  const [play, setPlay] = useState(false)
  
  return (
    <div className={Style.audioPlayer}>
      <div className={Style.audioPlayer_box}>
        <Image
          src={images.creatorbackground1}
          alt='music'
          width={100}
          height={100}
          className={Style.audioPlayer_box_img}
        />

        <div className={Style.audioPlayer_box_info}>
          <h4>NFT music #1145</h4>
          <div className={Style.audioPlayer_box_info_box}>
            <LikeProfile />
            <div className={Style.audioPlayer_box_info_box_price}>
              <small>Price</small>
              <p>1.00 ETH</p>
            </div>
          </div>
        </div>

        <div className={Style.audioPlayer_box_playBtn} onClick={() => setPlay(!play)}>
          {
            play ? <TbPlayerPause /> : <TbPlayerPlay />
          }
        </div>
      </div>
    </div>
  )
}

export default AudioCardSmall