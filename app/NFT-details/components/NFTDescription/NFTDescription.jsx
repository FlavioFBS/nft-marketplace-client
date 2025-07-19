'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep
} from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { FaWallet, FaPercentage } from 'react-icons/fa'
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from 'react-icons/ti'
import { BiTransfer, BiDollar, BiTransferAlt } from 'react-icons/bi'

import Style from './NFTDescription.module.css'
import img from '@/img'
import { Button } from '@/components/ComponentIndex'
import { NFTTabs } from '..'


const NFTDescription = () => {
  const [showSocial, setShowSocial] = useState(false);
  const [showNFTMenu, setShowNFTMenu] = useState(false);
  const [openTab, setOpenTabs] = useState(0);

  const tabs = [
    {
      text: "Bid History",
      dataArray: [
        img.user1,
        img.user2,
        img.user3,
        img.user4,
        img.user5,
      ]
    },
    {
      text: "Provenance",
      dataArray: [
        img.user6,
        img.user7,
        img.user8,
        img.user9,
        img.user10,
      ]
    },
    {
      text: "Owner",
      dataArray: [
        img.user1,
        img.user2,
        img.user3,
        img.user4,
        img.user5,
      ]
    }
  ]

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* part one */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => setShowSocial(!showSocial)}
            />

            {showSocial && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook />
                  Facebook
                </a>
                <a href="#">
                  <TiSocialLinkedin />
                  Linkedin
                </a>
                <a href="#">
                  <TiSocialTwitter />
                  Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube />
                  Youtube
                </a>
                <a href="#">
                  <TiSocialInstagram />
                  Instagram
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => setShowNFTMenu(!showNFTMenu)}
            />
            {showNFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="">
                  <BiDollar /> Change price
                </a>
                <a href="">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={Style.NFTDescription_box_profile}>
          <h1>BearX #1234</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={img.user1}
                alt='profile'
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small>
                <br />
                <span>User sample name <MdVerified /> </span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={img.user2}
                alt='profile'
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_right_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Creator</small>
                <br />
                <span>User-Creator sample name <MdVerified /> </span>
              </div>
            </div>
          </div>
        {/* </div> */}

        <div className={Style.NFTDescription_box_profile_biding}>
          <p>
            <MdVerified />
            <span>Auction ending in: </span>
          </p>
          <div className={Style.NFTDescription_box_profile_biding_box_timer}>
            {"02Days,02Hours,40Minutes,02Seconds".split(',').map((item, index) => (
              <div className={Style.NFTDescription_box_profile_biding_box_timer_item} key={index}>
                <p>{item.slice(0,2)}</p>
                <span>{item.slice(2)}</span>
              </div>
            ))}
          </div>

          <div className={Style.NFTDescription_box_profile_biding_box_price}>
            <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
              <small>Current Bid</small>
              <p>1.000 ETH <span>(= $2,595)</span></p>
            </div>

            <br />
            <span>[90 in stock]</span>
          </div>
          
          <div className={Style.NFTDescription_box_profile_biding_box_button}>
            <Button
              icon={<FaWallet />}
              btnName={"Place a bid"}
              handleClick={() => {}}
              classStyle={Style.button}
            />
            <Button
              icon={<FaPercentage />}
              btnName={"Make offer"}
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
          <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
            {tabs.map((tab, index) => (
              <button key={index} onClick={(e) => setOpenTabs(index)}>
                {tab.text}
              </button>
            ))}
          </div>

          <div className={Style.NFTDescription_box_profile_biding_box_card}>
            <NFTTabs dataTab={tabs[openTab].dataArray} icon={<MdVerified />} />
          </div>
        </div>

        </div>

      </div>
    </div>
  )
}

export default NFTDescription