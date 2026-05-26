'use client';
import React, { useState, useEffect, useContext } from 'react'

import Style from './author.module.css'

import images from '@/img'
import { Brand, Title } from '@/components/ComponentIndex'
import Filter from '@/components/Filter/Filter'
import img from '@/img'
import { Banner, NFTCardCollection } from '../collection/components'
import { AuthorProfileCard, AuthorTabs, AuthorNFTCardBox } from './components'
import FollowerTabCard from '@/components/FollowerTab/FollowerTabCard/FollowerTabCard';

import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

const Page = () => {

  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1
    },
    {
      background: images.creatorbackground2,
      user: images.user2
    },
    {
      background: images.creatorbackground3,
      user: images.user3
    },
    {
      background: images.creatorbackground4,
      user: images.user4
    },
    {
      background: images.creatorbackground5,
      user: images.user5
    },
    {
      background: images.creatorbackground6,
      user: images.user6
    },
  ]

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [following, setFollowing] = useState(false);
  const [follower, setFollower] = useState(false);

  const { address, fetchMyNFTsOrListedNFTs } = useContext(NFTMarketplaceContext);

  const [NFTs, setNFTs] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    if (address) {
      fetchMyNFTsOrListedNFTs("fetchItemsListed").then(items => {
        setNFTs(items);
      });
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchMyNFTsOrListedNFTs("fetchMyNFTs").then(items => {
        setMyNFTs(items);
      });
    }
  }, [address]);

  return (
    <div className={Style.author}>
      <Banner bannerImage={img.creatorbackground10} />
      <AuthorProfileCard currentAccount={address} />
      <AuthorTabs setCollectiables={setCollectiables} setCreated={setCreated} setLike={setLike} setFollower={setFollower} setFollowing={setFollowing} />
      <AuthorNFTCardBox collectiables={collectiables} created={created} like={like} following={following} follower={follower} nfts={NFTs} myNfts={myNFTs}/>

      <Title heading="Popular Creators" paragraph="Click on music icon and enjoy NFT msic or audio" />
      <div className={Style.author_box}>
        {
          followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))
        }
      </div>
      <Brand />

    </div>
  )
}

export default Page