
import React from 'react'

import Style from './nftDetails.module.css'
import { Button, Category, Brand } from '@/components/ComponentIndex'
import {NFTDescription, NFTDetailsImg, NFTTabs} from './components/index'

const Page = () => {
  return (
    <div>
      <div className={Style.NFTDetailsPage}>
        <div className={Style.NFTDetailsPage_box}>
          <NFTDetailsImg />
          <NFTDescription />
        </div>
      </div>
      <Category />
      <Brand />
    </div>
  )
}

export default Page

