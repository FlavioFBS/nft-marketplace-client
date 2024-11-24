import React from 'react'
import Image from 'next/image'
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti'

import Style from './CollectionProfile.module.css'
import img from '@/img'


const CollectionProfile = () => {
  const cardArray = [1, 2, 3, 4]

  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={img.nft_image_1}
            alt='nft image'
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
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

        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NTFs Collection</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Obcaecati officia id quasi, quia natus labore, ullam illum aliquam maxime qui.
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div key={i+1} className={Style.collectionProfile_box_middle_box_item}>
                <small>Floor price</small>
                <p>${i+1}96,412</p>
                <span>+ {i+2}.15%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionProfile