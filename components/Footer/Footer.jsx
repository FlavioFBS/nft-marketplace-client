'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp
} from 'react-icons/ti';
import { RiSendPlaneFill } from 'react-icons/ri'

import Style from './Footer.module.css';
import images from '../../img';
import { Discover, HelpCenter } from '../NavBar/index';


const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt='footer logo' height={100} width={100} priority/>
          <p>
            The world's first and largest digital marketplace for crypto collectibles
            and non-fungible tokens (NFT). Buy, sell exclusive digital items.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            {isClient && (
              <>
                <input type="email" placeholder='Enter you email *' />
                <RiSendPlaneFill className={Style.subscribe_box_send} />
              </>
            )}
          </div>

          <div className={Style.subscribe_box_info}>
            <p>
              Discover, collect and sell extraordinary NFTs OpenSea is the
              first and largest NFT marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer