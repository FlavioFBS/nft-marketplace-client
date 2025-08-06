'use client'
import React, { useState, useMemo, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

import Style from './account.module.css';
import Form from './components/Form/Form';
import img from '@/img';

const Page = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileUrl(URL.createObjectURL(file));
    
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 1048576 // 1MB
  });
  
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile and other personal settings here.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={fileUrl || img.user1} 
            alt="account upload" 
            width={100} 
            height={100}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>

        <div className={Style.account_box_form}>
          <Form />
        </div>

      </div>
    </div>
  );
}

export default Page;