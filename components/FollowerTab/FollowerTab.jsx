'use client'
import React, { useState, useEffect } from 'react'
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri'

import Style from './FollowerTab.module.css';
import FollowerTabCard from './FollowerTabCard/FollowerTabCard';
import images from '@/img';

const FollowerTab = () => {

  const cardArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
    },
  ]
  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
  ]
  const NewsArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
  ]
  const [collectionFilter, setCollectionFilter] = useState({
    popular: true,
    following: false,
    news: false,
  })

  const showCollectionList = (filter) => {
    let newCollectionFilter = { ...collectionFilter };

    Object.keys(collectionFilter).forEach(attr => {
      if (attr === filter) {
        newCollectionFilter[attr] = true
      } else {
        newCollectionFilter[attr] = false
      }
    })
    setCollectionFilter(newCollectionFilter);
  }

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2>Top Creators List ...</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button
              className={collectionFilter['popular'] ? Style.followerTab_tabs_btn_select : ''}
              onClick={() => showCollectionList('popular')}>
              <RiUserFollowFill /> Popular
            </button>
            <button
              className={collectionFilter['following'] ? Style.followerTab_tabs_btn_select : ''}
              onClick={() => showCollectionList('following')}>
              <RiUserFollowFill /> Following
            </button>
            <button
              className={collectionFilter['news'] ? Style.followerTab_tabs_btn_select : ''}
              onClick={() => showCollectionList('news')}>
              <RiAwardLine /> NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {
        collectionFilter['popular'] && (
          <div className={Style.followerTab_box}>
            {cardArray.map((el, i) => (
              <FollowerTabCard key={i + 1} i={i} el={el}/>
            ))}
          </div>
        )
      }

      {
        collectionFilter['following'] && (
          <div className={Style.followerTab_box}>
            {FollowingArray.map((el, i) => (
              <FollowerTabCard key={i + 1} i={i} el={el}/>
            ))}
          </div>
        )
      }

      {
        collectionFilter['news'] && (
          <div className={Style.followerTab_box}>
            {NewsArray.map((el, i) => (
              <FollowerTabCard key={i + 1} i={i} el={el}/>
            ))}
          </div>
        )
      }

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become author</a>
        </div>
      </div>

    </div>
  )
}

export default FollowerTab