import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp
} from 'react-icons/ti'

import Style from './SideBar.module.css';
import images from '../../../img';
import { Button } from '@/components/ComponentIndex';

const SideBar = ({ setOpenSideMenu }) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const discover = [
    {
      name: 'Collection',
      link: 'collection'
    },
    {
      name: 'Search',
      link: 'search'
    },
    {
      name: 'Author Profile',
      link: 'author'
    },
    {
      name: 'NFT Details',
      link: 'NFT-details'
    },
    {
      name: 'Account Setting',
      link: 'account-setting'
    },
    {
      name: 'Connect Wallet',
      link: 'connect-wallet'
    },
    {
      name: 'Blog',
      link: 'blog'
    },
  ]

  const helpCenter = [
    {
      name: 'About',
      link: 'about'
    },
    {
      name: 'Contact Us',
      link: 'contact-us'
    },
    {
      name: 'Sign Up',
      link: 'sign-ip'
    },
    {
      name: 'Sign In',
      link: 'sign-in'
    },
    {
      name: 'Subscription',
      link: 'subscription'
    },
  ];

  const closeSidebar = () => {
    setOpenSideMenu(false);
  }

  return (
    <div className={Style.sidebar}>
      <GrClose className={Style.sidebar_closeBtn} onClick={() => closeSidebar()} />

      <div className={Style.sidebar_box}>
        <Image src={images.logo} alt='logo' width={150} height={150} priority/>
        <p>Discover the most outstading articles on all
          topcis of NFT & your own stories and share them
        </p>
        <div className={Style.sidebar_social}>
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

      <div className={Style.sidebar_menu}>
        <div>
          <div className={Style.sidebar_menu_box}
            onClick={() => setOpenDiscover(!openDiscover)}
          >
            <p>Discover</p>
            {!openDiscover && <TiArrowSortedDown />}
            {openDiscover && <TiArrowSortedUp />}
          </div>

          {
            openDiscover && (
              <div className={Style.sidebar_disover}>
                {discover.map((el, i) => (
                  <p key={i + 1}>
                    <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                  </p>
                ))}
              </div>
            )}
        </div>
        <div>
          <div className={Style.sidebar_menu_box}
            onClick={() => setOpenHelp(!openHelp)}
          >
            <p>Help Center</p>
            {!openHelp && <TiArrowSortedDown />}
            {openHelp && <TiArrowSortedUp />}
          </div>

          {
            openHelp && (
              <div className={Style.sidebar_discover}>
                {helpCenter.map((el, i) => (
                  <p key={i + 1}>
                    <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                  </p>
                ))}
              </div>
            )
          }
        </div>
      </div>

      <div className={Style.sidebar_button}>
        <Button btnName='Create' handleClick={() => { }} />
        <Button btnName='Connect wallet' handleClick={() => { }} />
      </div>
    </div>
  )
}

export default SideBar