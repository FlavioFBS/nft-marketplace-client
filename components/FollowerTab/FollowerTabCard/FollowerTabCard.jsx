import React, { useState } from 'react'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import Style from './FollowerTabCard.module.css'

const FollowerTabCard = ({ i, el }) => {

    const [following, setFollowing] = useState(false);

    return (
        <div className={Style.followerTabCard}>
            <div className={Style.followerTabCard_rank}>
                <p>
                    #{i + 1} <span>🥇</span>
                </p>
            </div>

            <div className={Style.followerTabCard_box}>
                <div className={Style.followerTabCard_box_img}>
                    <Image
                        src={el.background}
                        alt='profile background'
                        className={Style.followerTabCard_box_img_img}
                        fill
                        sizes='100vw'
                    />
                </div>

                <div className={Style.followerTabCard_box_profile}>
                    <Image
                        className={Style.followerTabCard_box_profile_img}
                        alt='profile picture'
                        src={el.user}
                    />
                </div>

                <div className={Style.followerTabCard_box_info}>
                    <div className={Style.followerTabCard_box_info_name}>
                        <h4>User Name <span><MdVerified /></span></h4>
                        <p>12.321 ETH</p>
                    </div>

                    <div className={Style.followerTabCard_box_info_following}>
                        {!following ? (
                            <a onClick={() => setFollowing(!following)}>
                                Follow {" "} <span><TiTick /></span>
                            </a>
                        ) : (
                            <a onClick={() => setFollowing(!following)}>Following</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowerTabCard