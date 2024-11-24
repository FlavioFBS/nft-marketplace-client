import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Style from './SliderCard.module.css'
import { LikeProfile } from '@/components/ComponentIndex'


const SliderCard = ({ el, i }) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image
            src={el.background}
            alt='slider profile'

            sizes='100vw'
            className={Style.sliderCard_box_img_img}
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>NFT Video #1234</p>
          <div className={Style.sliderCard_box_title_like}>
            <LikeProfile />
            <small>1 of 100</small>
          </div>
        </div>
        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>1.000 ETH</p>
          </div>
          <div className={Style.sliderCard_box_price_time}>
            <small>Remaining time</small>
            <p>3h : 15m : 13s</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SliderCard