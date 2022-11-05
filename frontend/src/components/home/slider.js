import React from 'react';

import { Slide } from 'react-slideshow-image';
import styles from './index.module.css';
import 'react-slideshow-image/dist/styles.css'


const TicketSlider = () => {
  
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  
  return (
    <div className='w-100' >
      <Slide 
        duration='2000'
        transitionDuration='500'
      >
        <div className={styles.each_slide_effect}>
          <div style={{ 'backgroundImage': `url(${images[0]})` }}>
          </div>
        </div>
        <div className={styles.each_slide_effect}>
          <div style={{ 'backgroundImage': `url(${images[1]})` }}>
          </div>
        </div>
        <div className={styles.each_slide_effect}>
          <div style={{ 'backgroundImage': `url(${images[2]})` }}>
          </div>
        </div>
      </Slide>
    </div>
  )

}

export default TicketSlider