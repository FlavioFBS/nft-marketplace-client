import React from "react";

import Image from "next/image";


import Styles from './NFTTabs.module.css'


const NFTTabs = ({ dataTab, icon }) => {

  return (
    <div className={Styles.NFTTabs}>
      {dataTab.map((item, index) => (
        <div key={index} className={Styles.NFTTabs_box}>
          <Image 
            src={item} 
            alt="profile image"
            width={40} 
            height={40} 
            objectFit="cover"
            className={Styles.NFTTabs_box_img}
          />
          <div className={Styles.NFTTabs_box_info}>
            <span>Offer by $110 by 
              <span>User {index + 1} </span>
              {icon}
            </span>
            <small>Jan 01 - 10:30</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTTabs