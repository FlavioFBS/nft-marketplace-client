'use client'
import React, { useState } from 'react';

import Image from 'next/image';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiTick
} from 'react-icons/ti';

import Style from './AuthorTabs.module.css';

const AuthorTabs = ({ setCollectiables, setCreated, setLike, setFollower, setFollowing }) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const [menuList, setMenuList] = useState([
    {
      activeBn: 1,
      text: 'Collectiables'
    },
    {
      activeBn: 2,
      text: 'Created'
    },
    {
      activeBn: 3,
      text: 'Liked'
    },
    {
      activeBn: 4,
      text: 'Following'
    },
    {
      activeBn: 5,
      text: 'Followers'
    }
  ])

  const openTab = (activeBn) => {
    setActiveBtn(activeBn);
    setOpenList(false);
    if(activeBn === 1) {
      setCollectiables(true);
      setCreated(false);
      setLike(false);
      setFollowing(false);
      setFollower(false);
    } else if(activeBn === 2) {
      setCreated(true);
      setCollectiables(false);
      setLike(false);
      setFollowing(false);
      setFollower(false);
    } else if(activeBn === 3) {
      setLike(true);
      setCollectiables(false);
      setCreated(false);
      setFollowing(false);
      setFollower(false);
    } else if(activeBn === 4) {
      setFollowing(true);
      setCollectiables(false);
      setCreated(false);
      setLike(false);
      setFollower(false);
    } else if(activeBn === 5) {
      setFollower(true);
      setCollectiables(false);
      setCreated(false);
      setLike(false);
      setFollowing(false);
    }
  }

  return (
    <div className={Style.AuthorTabs}>
      <div className={Style.AuthorTabs_box}>
        <div className={Style.AuthorTabs_box_left}>
          <div className={Style.AuthorTabs_box_left_btn}>
            {menuList.map((el, i) => (
              <button
                key={i}
                className={`${activeBtn == el.activeBn ? Style.active : ''}`}
                onClick={(e) => openTab(el.activeBn)}
              >{el.text}</button>
            ))}
          </div>
        </div>

        <div className={Style.AuthorTabs_box_right}>
          <div
            className={Style.AuthorTabs_box_right_para}
            onClick={() => setOpenList(!openList)}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {openList && (
            <div className={Style.AuthorTabs_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1} 
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTabs_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el ? <TiTick /> : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthorTabs