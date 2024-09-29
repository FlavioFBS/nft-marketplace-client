'use client'
import React, { useState, useEffect } from 'react'
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri'

import Style from './FollowerTab.module.css';
import FollowerTabCard from './FollowerTabCard/FollowerTabCard';

const FollowerTab = () => {

  const cardArray = [1, 2, 3, 4, 5, 6, 7, 8]
  const FollowingArray = [1, 2, 3, 4, 5, 6]
  const NewsArray = [1, 2, 3, 4, 5]
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