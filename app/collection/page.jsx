import React from 'react'

import Style from './collection.module.css'

import images from '@/img'
import { Banner, CollectionProfile, NFTCardCollection } from './components'
import { Brand, Slider } from '@/components/ComponentIndex'
import Filter from '@/components/Filter/Filter'
import img from '@/img'

const Page = () => {

  const collectionArray = [
    img.nft_image_1,
    img.nft_image_2,
    img.nft_image_3,
    img.nft_image_1,
    img.nft_image_2,
    img.nft_image_3,
    img.nft_image_1,
    img.nft_image_2,
    img.nft_image_3,
  ]

  return (
    <div className={Style.collection}>
      <Banner bannerImage={img.creatorbackground1}/>
      <CollectionProfile />
      <Filter />
      <NFTCardCollection NFTData={collectionArray}/>
      <Slider />
      <Brand /> 
    </div>
  )
}

export default Page