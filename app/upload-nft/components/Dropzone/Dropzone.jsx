'use client'
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

import Style from './Dropzone.module.css';
import img from '@/img';


const Dropzone = (
  {
    title,
    heading,
    subHeading,
    name,
    website,
    description,
    royalties,
    fileSize,
    category,
    properties,
    setImage,
    uploadToIPFS
  }
) => {

  const [fileUrl, setFileUrl] = useState(null);

  // cleanup URL object when component unmounts or when fileUrl changes
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // cleanup previous URL if it exists to prevent memory leaks
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    // Create local URL for preview (do not upload to IPFS yet)
    const localUrl = URL.createObjectURL(file);
    setFileUrl(localUrl);
    
    // Save the original file for later upload
    setImage(file);
    
    console.log('✅ File selected for preview:', file.name);
    console.log('📁 File size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('🎯 Ready for upload when user clicks "Upload NFT"');
  }, [setImage, fileUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 50000000 // 50MB
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={fileUrl || img.upload}
              alt="Uploaded file"
              width={100}
              height={100}
              className={Style.DropZone_box_input_img_img}
            />
          </div>

          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image
              src={fileUrl} // ipfs link
              alt="Uploaded file"
              width={100}
              height={100}
              objectFit='contain'
              className={Style.DropZone_box_aside_box_img}
            />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name:</samp>{name || "Untitled"}
                </p>
                <p>
                  <samp>Website:</samp>{website || "Untitled"}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>{description || "Untitled"}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties</span>{royalties || "Untitled"}
                </p>
                <p>
                  <span>File Size</span>{fileSize || "Untitled"}
                </p>
                <p>
                  <span>Category</span>{category || "Untitled"}
                </p>
                <p>
                  <span>Properties</span>{properties || "Untitled"}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default Dropzone;