import React from 'react';

import Styles from './Title.module.css';

const Title = ({heading, paragraph}) => {
  return (
    <div className={Styles.title}>
      <div className={Styles.title_box}>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  )
}

export default Title