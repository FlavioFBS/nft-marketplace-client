'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';

import Style from './NavBar.module.css'
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import { Button } from '../ComponentIndex';
import images from '../../img';

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false)
  const [notification, setNotification] = useState(false)
  const [profile, setProfile] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)


  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == 'Discover') {
      if (!discover) {
        setDiscover(true);
      } else {
        setDiscover(false);
      }
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == 'Help Center') {
      setDiscover(false);
      if (!help) {
        setHelp(true);
      } else {
        setHelp(false);
      }
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
    e.preventDefault()
  }

  const openNotifications = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  }

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  }

  const openSidebar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  }


  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo} alt="NFT Market place" width={100} height={100}></Image>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder='Search NFT' />
              <BsSearch onClick={() => { }} className={Style.search_icon}></BsSearch>
            </div>
          </div>
        </div>

        {/* end of left section */}
        <div className={Style.navbar_container_right}>
          {/* DISCOVER MENU */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION MENU */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications className={Style.notify} onClick={() => openNotifications()} />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            <Button btnName='Create' handleClick={() => {}}/>
          </div>

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt='Profile'
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile />}
            </div>
          </div>

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight className={Style.menuIcon}
              onClick={() => openSidebar()}
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sidebar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  )
}

export default NavBar