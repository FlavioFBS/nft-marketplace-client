import React from 'react';

import Style from '../styles/index.module.css';
import { BigNFTSlider, Category, Filter, HeroSection, Service, Subscribe, Title } from '@/components/ComponentIndex';


const Home = () => {

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading='Featured NFTs'
        paragraph='Discover the most outstanding NFTs in all topics of life'
      />
      <Filter />
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