'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

const NFTDescription = ({ nftData }) => {
  const [showSocial, setShowSocial] = useState(false);
  const [showNFTMenu, setShowNFTMenu] = useState(false);
  const [openTab, setOpenTabs] = useState(0);
  const [authorUrl, setAuthorUrl] = useState('');

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

  const { address: currentAccount, isConnecting, isDisconnected, walletClient, buyNFT, reSellNFT } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    const nftAuthorUrl = `/author?${new URLSearchParams({
      seller: nftData ? String(nftData.seller || '') : '',
      owner: nftData ? String(nftData.owner || '') : '',
      // description: isRealNFTData ? String(el.description || '') : `This is Clone #${i + 1}`,
      // tokenUri: isRealNFTData ? String(el.tokenUri || '') : ''
    }).toString()}`;
    setAuthorUrl(nftAuthorUrl);
  }, []);

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
          <h1>{nftData.name} #{nftData.tokenId}</h1>
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
                <Link href={authorUrl} className={Style.NFTDescription_box_profile_box_left_info_link}>
                  <br />
                  <span>User sample name <MdVerified /> </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={img.creatorbackground1}
                alt='profile'
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_right_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small>
                <br />
                <span>DBz - Gif <MdVerified /> </span>
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
                  <p>{item.slice(0, 2)}</p>
                  <span>{item.slice(2)}</span>
                </div>
              ))}
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                <small>Current Bid</small>
                <p>{nftData.price} ETH <span>(= $2,595)</span></p>
              </div>

              <br />
              <span>[90 in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {!currentAccount || isDisconnected ? (
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  margin: '1rem 0'
                }}>
                  <p style={{ color: '#6c757d', marginBottom: '0.5rem' }}>
                    🔌 Connect your wallet to interact with this NFT
                  </p>
                  <small style={{ color: '#6c757d' }}>
                    You need to connect your wallet to buy, list, or place bids
                  </small>
                </div>
              ) : (currentAccount.toLowerCase() === (nftData.seller || '').toLowerCase()) ? (
                <p>You cannot buy your own NFT</p>
              ) : (currentAccount.toLowerCase() === (nftData.owner || '').toLowerCase()) ? (
                <Button
                  icon={<FaWallet />}
                  btnName={"List on Marketplace"}
                  handleClick={() => {
                    const newPrice = prompt('Enter new price in ETH:', nftData.price);
                    if (newPrice && newPrice > 0) {
                      reSellNFT(nftData, newPrice);
                    }
                  }}
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  icon={<FaWallet />}
                  btnName={"Buy NFT"}
                  handleClick={() => buyNFT(nftData)}
                  classStyle={Style.button}
                />
              )}
              <Button
                icon={<FaWallet />}
                btnName={"Place a bid"}
                handleClick={() => { }}
                classStyle={Style.button}
              />
              <Button
                icon={<FaPercentage />}
                btnName={"Make offer"}
                handleClick={() => { }}
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