import React from 'react';

import Style from '../styles/index.module.css';
import { BigNFTSlider, Category, HeroSection, Service, Subscribe, Title } from '@/components/ComponentIndex';


const Home = () => {

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Subscribe />
      <Title 
        heading='Browse by Category'
        paragraph='Explore the NFTs in the most featured categories'
      />
      <Category />
    </div>
  )
}

export default Home