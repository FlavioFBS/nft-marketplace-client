'use client'
import React, { useState, useMemo, useCallback, useContext } from 'react';
import Image from 'next/image';
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md'
import { FaPercent } from 'react-icons/fa';
import { AiTwotonePropertySafety } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';

import Style from './uploadNft.module.css';
import ExtraStyle from './uploadNftExtras.module.css';
import formStyle from '../../../account-setting/components/Form/Form.module.css'
import images from '@/img';
import { Button } from '@/components/ComponentIndex';
import Dropzone from '../Dropzone/Dropzone';

const UploadNFT = () => {
  const [active, setActive] = useState(0);
  const [itemName, setItemName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!itemName.trim()) newErrors.itemName = "Item name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Please select a category";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    if (validateForm()) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        alert("NFT uploaded successfully!");
      }, 2000);
    }
  };

  const handleCategorySelect = (index, categoryName) => {
    setActive(index + 1);
    setCategory(categoryName);
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: null }));
    }
  };

  const categoryArry = [
    {
      image: images.nft_image_1,
      category: "Sports",
    },
    {
      image: images.nft_image_2,
      category: "Arts",
    },
    {
      image: images.nft_image_3,
      category: "Music",
    },
    {
      image: images.nft_image_1,
      category: "Digital",
    },
    {
      image: images.nft_image_2,
      category: "Time",
    },
    {
      image: images.nft_image_3,
      category: "Photography",
    },
  ];

  return (
    <div className={Style.upload}>
      <Dropzone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        itemName={itemName}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        image={images.upload}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name *</label>
          <input
            type="text"
            placeholder="Enter NFT name"
            className={`${formStyle.Form_box_input_userName} ${errors.itemName ? ExtraStyle.error : ''}`}
            onChange={(e) => {
              setItemName(e.target.value);
              if (errors.itemName) setErrors(prev => ({ ...prev, itemName: null }));
            }}
            value={itemName}
          />
          {errors.itemName && <span className={ExtraStyle['error-message']}>{errors.itemName}</span>}
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="url"
              placeholder="https://yourwebsite.com"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description *</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="6"
            placeholder="Describe your NFT in detail..."
            className={errors.description ? ExtraStyle.error : ''}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: null }));
            }}
            value={description}
          ></textarea>
          {errors.description && <span className={ExtraStyle['error-message']}>{errors.description}</span>}
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="category">Choose collection *</label>
          <p className={Style.upload_box_input_para}>
            Choose an existing collection or create a new one
          </p>
          {errors.category && <span className={ExtraStyle['error-message']}>{errors.category}</span>}

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active === i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => handleCategorySelect(i, el.category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategorySelect(i, el.category);
                  }
                }}
                tabIndex="0"
                role="button"
                aria-pressed={active === i + 1}
                aria-label={`Select ${el.category} category`}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt={`${el.category} category`}
                      className={Style.upload_box_slider_box_img_img}
                      fill
                      sizes="(max-width: 480px) 45px, (max-width: 768px) 50px, (max-width: 900px) 55px, (max-width: 1200px) 60px, 70px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - {el.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="number"
                placeholder="5"
                min="0"
                max="50"
                onChange={(e) => setRoyalties(e.target.value)}
                value={royalties}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="165 MB"
                onChange={(e) => setFileSize(e.target.value)}
                value={fileSize}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Properties">Properties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Rare, Animated, etc."
                onChange={(e) => setProperties(e.target.value)}
                value={properties}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName={isUploading ? "Uploading..." : "Upload NFT"}
            handleClick={handleUpload}
            classStyle={Style.upload_box_btn_style}
            disabled={isUploading}
          />
          <Button
            btnName="Preview"
            handleClick={() => {
              if (validateForm()) {
                alert("Preview functionality coming soon!");
              }
            }}
            classStyle={Style.upload_box_btn_style}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadNFT;