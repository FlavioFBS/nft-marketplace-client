import React from 'react'

import Style from './search.module.css'

import images from '@/img'
import { SearchBar } from './components';
import { Slider, Brand, Filter } from '@/components/ComponentIndex';
import { NFTCardCollection, Banner } from '../collection/components';

const Page = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ]


  return (
    <div className={Style.search}>

      <Banner bannerImage={images.creatorbackground10} />
      <SearchBar />
      <Filter />
      <NFTCardCollection NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  )
}

export default Page