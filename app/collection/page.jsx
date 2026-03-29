import React from 'react'

import Style from './collection.module.css'

import { Banner, CollectionProfile, NFTCardCollection } from './components'
import { Brand, Slider } from '@/components/ComponentIndex'
import Filter from '@/components/Filter/Filter'
import img from '@/img'

const Page = () => {
  return (
    <div className={Style.collection}>
      <Banner bannerImage={img.creatorbackground1}/>
      <CollectionProfile />
      <Filter />
      <NFTCardCollection NFTData={[]}/>
      <Slider />
      <Brand /> 
    </div>
  )
}

export default Page