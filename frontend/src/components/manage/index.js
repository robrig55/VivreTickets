import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './index.module.css'

import UserManage from './users';
import EventManage from './events';
import Content from './content';

import { UserContext } from '../provider/UserProvider';


const Manage = () => {

  const [page, setPage] = useState(1);

  const { token, role } = useContext(UserContext)

  if(!token || role === 'user') {
    return <Navigate to={{pathname: '/signin'}} />
  }

  return (
    <div className={`${styles.manage} w-100`}>
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        className='w-100'
      >
        <div 
          className={
            page === 1 ?
              `${styles.clickable} normal-boldfont` :
              `${styles.clickable} normal-font`
          }
          onClick={() => {setPage(1)}}
        > 
          USERS 
        </div>
        <span className='normal-font pl-10 pr-10'> | </span>
        <div 
          className={
            page === 2 ?
              `${styles.clickable} normal-boldfont` :
              `${styles.clickable} normal-font`
          }
          onClick={() => {setPage(2)}}
        > 
          EVENTS 
        </div>
        <span className='normal-font pl-10 pr-10'> | </span>
        <div 
          className={
            page === 3 ?
              `${styles.clickable} normal-boldfont` :
              `${styles.clickable} normal-font`
          }
          onClick={() => { setPage(3) }}
        > 
          CONTENT 
        </div>
      </div>
      <div className={`${styles.manage} w-100 p-10`}>
        { page === 1 && <UserManage /> }
        { page === 2 && <EventManage /> }
        { page === 3 && <Content /> }        
      </div>
    </div>
  )
}

export default Manage