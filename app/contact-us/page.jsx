'use client'
import React, { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiPhone,
  TiMail,
  TiMap,
  TiWorld
} from 'react-icons/ti'

import Style from './ContactUs.module.css';
import formStyle from '../account-setting/components/Form/Form.module.css';
import { Button } from '@/components/ComponentIndex';


const Page = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3><TiMap /> Address</h3>
              <p>123 Main St, Anytown, USA</p>
            </div>

            <div className={Style.contactus_box_box_left_item}>
              <h3><TiMail /> Email</h3>
              <p>contact@example.com</p>
            </div>

            <div className={Style.contactus_box_box_left_item}>
              <h3><TiPhone /> Phone</h3>
              <p>(123) 456-7890</p>
            </div>

            <div className={Style.contactus_box_box_left_item}>
              <h3><TiWorld /> Socials</h3>
              <p>
                <a href="#"><TiSocialFacebook /></a>
                <a href="#"><TiSocialTwitter /></a>
                <a href="#"><TiSocialInstagram /></a>
                <a href="#"><TiSocialLinkedin /></a>
                <a href="#"><TiSocialYoutube /></a>
              </p>
            </div>
          </div>
          <div className={Style.contactus_box_box_right}>
            {isClient && (
              <form>
                <div className={formStyle.Form_box_input}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    placeholder="shoaib bhai"
                    className={formStyle.Form_box_input_userName}
                  />
                </div>
                <div className={formStyle.Form_box_input}>
                  <label htmlFor="email">Email</label>
                  <div className={formStyle.Form_box_input_box}>
                    <div className={formStyle.Form_box_input_box_icon}>
                      <HiOutlineMail />
                    </div>
                    <input type="text" placeholder="Email*" />
                  </div>
                </div>
                <div className={formStyle.Form_box_input}>
                  <label htmlFor="description">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    placeholder="something about yourself in few words"
                  ></textarea>
                </div>
                <Button
                  btnName="Send Message"
                  classStyle={Style.button}
                  handleClick={() => { }}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
