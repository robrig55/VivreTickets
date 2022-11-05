import React from 'react';
import TicketSlider from './slider';
import Tickets from './tickets';

import styles from './index.module.css'

const Home = () => {

  return (
    <div className={styles.home}>
      <TicketSlider />
      <Tickets />
    </div>
  )
}

export default Home