import React from "react";
import Image from "next/image";

import Style from "./AboutUs.module.css";
import { Brand } from "@/components/ComponentIndex";
import images from "@/img";

const aboutus = () => {
  const founderArray = [
    {
      name: "Founder1",
      position: "CEO",
      images: images.user1,
    },
    {
      name: "Founder2",
      position: "CTO",
      images: images.user2,
    },
    {
      name: "Founder3",
      position: "CIO",
      images: images.user3,
    },
    {
      name: "Founder4",
      position: "CFO",
      images: images.user4,
    },
  ];

  const factsArray = [
    {
      title: "10 million",
      info: "Articles have been public around the world (as of Sept. 30, 2021)",
    },
    {
      title: "100,000",
      info: "Registered users account (as of Sept. 30, 2021)",
    },
    {
      title: "220+",
      info: "Countries and regions have our presence (as of Sept. 30, 2021",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us.</h1>
            <p>
              We’re impartial and independent, and every day we create
              distinctive, world-class programmes and content which inform,
              educate and entertain millions of people in the around the world.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image 
              src={images.hero2} 
              alt="About us hero image"
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Founder</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div key={i} className={Style.aboutus_box_founder_box_img}>
                <div className={Style.aboutus_box_founder_box_img_container}>
                  <Image
                    src={el.images}
                    alt={el.name}
                    width={200}
                    height={200}
                    className={Style.aboutus_box_founder_box_img_img}
                  />
                </div>
                <div className={Style.aboutus_box_founder_box_info}>
                  <h3>{el.name}</h3>
                  <p>{el.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div key={i} className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;