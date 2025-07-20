import React from 'react';
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineHttp, MdOutlineContentCopy } from 'react-icons/md';
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';

import { Button } from '@/components/ComponentIndex';
import Style from './Form.module.css';

const Form = () => {
  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form action="">
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input type="text" placeholder='Enter your username' className={Style.Form_box_input_userName} />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail/>
              </div>
              <input type="text" placeholder='Enter your email'/>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea 
              name=''
              id='description'
              cols={30}
              rows={6}
              placeholder='Something about yourself' 
              className={Style.Form_box_input_display}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input type="text" placeholder='Enter your website'/>
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input type="text" placeholder='Enter your Facebook link'/>
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input type="text" placeholder='Enter your Twitter link'/>
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="instagram">Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input type="text" placeholder='Enter your Instagram link'/>
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input type="text" placeholder='Enter your wallet address'/>

              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button 
              btnName='Upload profile' 
              className={Style.button} 
              handleClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;