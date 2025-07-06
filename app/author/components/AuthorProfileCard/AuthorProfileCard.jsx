'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReport,
  MdOutlineReportProblem
} from 'react-icons/md'
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram
} from 'react-icons/ti'
import {
  FiCopy
} from 'react-icons/fi';

import {
  BsThreeDots,
} from 'react-icons/bs'

import Style from './AuthorProfileCard.module.css';
import img from '@/img';
import { Button } from '@/components/ComponentIndex';

const AuthorProfileCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [report, setReport] = useState(false);
  const [share, setShare] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyAddress = () => {
    const input = document.getElementById('myInput');
    input.select();
    navigator.clipboard.writeText(input.value)
      .then(() => {
        console.log('Text copied');
        console.log(input.value);
      })
      .catch((err) => console.error(err.name, err.message));

  }

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={img.nft_image_1}
            alt='NFT IMAGES'
            width={220}
            height={220}
            className={Style.AuthorProfileCard_box_img_img}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            User Name {" "}
            <span>
              <MdVerified className={Style.AuthorProfileCard_box_info_icon} />
            </span>
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            {isClient && (
              <>
                <input type="text" onChange={(e) => {}} value={'0x0000000000000000000000000000000000000000'} id='myInput' />
                <FiCopy onClick={copyAddress} className={Style.AuthorProfileCard_box_info_address_icon} />
              </>
            )}
          </div>
          <p>
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to ether_cards, an NFT Monetization Platform.
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
              <TiSocialFacebook />
            </a>
            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
              <TiSocialTwitter />
            </a>
            <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer'>
              <TiSocialYoutube />
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName='Follow' handleClick={() => { }} btnIcon={<MdVerified />} />
          <MdCloudUpload onClick={() => setShare(!share)} className={Style.AuthorProfileCard_box_share_icon} />

          {(share && !report) && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook /> Facebook
                </span>
              </p>
              <p>
                <span>
                  <TiSocialTwitter /> Twitter
                </span>
              </p>
              <p>
                <span>
                  <TiSocialInstagram /> Instagram
                </span>
              </p>
              <p>
                <span>
                  <TiSocialYoutube /> Youtube
                </span>
              </p>
            </div>
          )}
          <BsThreeDots onClick={() => setReport(!report)} className={Style.AuthorProfileCard_box_share_icon} />
          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>
              Report abouse
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default AuthorProfileCard