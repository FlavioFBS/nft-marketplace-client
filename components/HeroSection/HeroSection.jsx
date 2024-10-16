'use client'
import React from 'react';
import Image from 'next/image';

import Style from './HeroSection.module.css';
import { Button } from '../ComponentIndex';
import images from '@/img';

const HeroSection = () => {
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1>Discover, collect and sell NFTs</h1>
                    <p>
                        Discover the most outstading NFTs in all
                        topics of life. Create your NFTs and sell them
                    </p>
                    <Button btnName='Start your search' />
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image
                        src={images.hero}
                        alt='Hero section'
                        fill
                        sizes='100vw'
                        className={Style.heroSection_box_right_img}
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection