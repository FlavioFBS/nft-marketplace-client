'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiSendPlaneFill } from 'react-icons/ri'

import Style from './Subscribe.module.css';
import images from '@/img';

const Subscribe = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss a drop</h2>
          <p>
            Subscribe to our super-exclusive drop
            list and be the first to know about upcoming drops
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premiun magazines</small>
          </div>

          <div className={Style.subscribe_box_left_input}>
            {isClient && (
              <>
                <input type="email" placeholder='Enter your email' />
                <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} />
              </>
            )}
          </div>
        </div>

        <div className={Style.subscribe_box_right}>
          <Image src={images.update} alt='get update' className={Style.subscribe_box_right_img} />
        </div>
      </div>
    </div>
  )
}

export default Subscribe