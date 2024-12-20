'use client'
import React, { useEffect, useState } from 'react';
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3
} from 'react-icons/bs';
import DaysComponents from './DaysComponents/DaysComponents';

import Style from './Collection.module.css';
import images from '@/img';

const Collection = () => {
  const [collectionFilter, setCollectionFilter] = useState({
    popular: true,
    following: false,
    news: false,
  })

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
  const followingArray = [
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
  const newsArray = [
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
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button
              className={collectionFilter['popular'] ? Style.collection_collections_btn_select : ''}
              onClick={() => showCollectionList('popular')}
            >
              <BsFillAlarmFill /> Last 24 hours
            </button>
            <button
              className={collectionFilter['following'] ? Style.collection_collections_btn_select : ''}
              onClick={() => showCollectionList('following')}
            >
              <BsCalendar3 /> Last 7 days
            </button>
            <button
              className={collectionFilter['news'] ? Style.collection_collections_btn_select : ''}
              onClick={() => showCollectionList('news')}
            >
              <BsFillCalendarDateFill /> Last 30 days
            </button>
          </div>
        </div>
      </div>

      {
        collectionFilter['popular'] && (
          <div className={Style.collection_box}>
            {cardArray.map((el, i) => (
              <DaysComponents key={i + 1} el={el} i={i} />
            ))}
          </div>
        )
      }

      {
        collectionFilter['following'] && (
          <div className={Style.collection_box}>
            {followingArray.map((el, i) => (
              <DaysComponents key={i + 1} el={el} i={i} />
            ))}
          </div>
        )
      }

      {
        collectionFilter['news'] && (
          <div className={Style.collection_box}>
            {newsArray.map((el, i) => (
              <DaysComponents key={i + 1} el={el} i={i} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Collection
