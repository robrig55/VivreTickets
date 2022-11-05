import React, { useState, useEffect, useContext } from 'react'
import Purchase from './purchase'

import styles from './index.module.css'
import MyEvent from './myevent'
import Info from './info'

import { Navigate, useParams } from 'react-router-dom'
import { getEventByUser, getActivityByUser, getUser, getUserById } from '../apis'
import LoadingScreen from '../utils/loadingScreen'

import { UserContext } from '../provider/UserProvider';

const Profile = (props) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [eventData, setEventData] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [userData, setUserData] = useState({})

  const { _id } = useParams()

  const { token, role, user, saveToken } = useContext(UserContext)

  useEffect(() => {
    preLoading()
  }, [])

  const preLoading = async () => {
    const currentUser = await getUserById(_id)
    const events = await getEventByUser(currentUser.email)
    const actions = await getActivityByUser(currentUser.email)
    const tmp_user = await getUser(currentUser.email)
    setUserData(tmp_user[0])
    setEventData(events)
    setHistoryData(actions)
    setLoading(false)
  }

  if(!token) {
    return <Navigate to={{pathname: '/signin'}} />
  }

  return (
    <div className={`${styles.profile}`}>
      {
        loading === true ?
          <LoadingScreen />
          :
          <>
            <div className='mt-20 bold-font' > {
              userData.email === user ?
               'MY PROFILE' : `${userData.f_name}'s PROFILE` 
            }</div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexFlow: 'row wrap'}}>
              <div className='normal-font' style={{whiteSpace: 'nowrap'}}>{ userData.f_name } {userData.l_name}</div>
              <span className='normal-font'>&nbsp;|&nbsp;</span>
              <div className='normal-font'>+{ userData.phone }</div>
              <span className='normal-font'>&nbsp;|&nbsp;</span>
              <div className='normal-font'>{ userData.email }</div>
            </div>
            <div className={`mt-20 ${styles.content} w-100`}>
              <div className={`${styles.sidebar}`}>
                <div className={ currentPage === 1 ? `${styles.nav} ${styles.active}` : `${styles.nav}`} onClick={() => { setCurrentPage(1) }}>
                  {
                    userData.email === user ?
                    'MY EVENTS' : `${userData.f_name}'s EVENTS` 
                  }
                </div>
                <div className={ currentPage === 2 ? `${styles.nav} ${styles.active}` : `${styles.nav}`} onClick={() => { setCurrentPage(2) }}>
                  PURCHASES
                </div>
                {
                  userData.email === user ?
                    <div className={ currentPage === 3 ? `${styles.nav} ${styles.active}` : `${styles.nav}`} onClick={() => { setCurrentPage(3) }}>
                    EMAIL
                    </div> 
                    :
                    <></>
                }
                {
                  userData.email === user ?
                    <div className={ currentPage === 4 ? `${styles.nav} ${styles.active}` : `${styles.nav}`} onClick={() => { setCurrentPage(4) }}>
                      PASSWORD
                    </div>
                    :
                    <></>
                }
              </div>
              <div className={styles.divider} />
              <div className={`${styles.detail}` }>
                {
                  currentPage === 1 && <MyEvent data={ eventData } />
                }
                {
                  currentPage === 2 && <Purchase data={ historyData } />
                }
                {
                  currentPage === 3 && <Info user={user} type="email" setToken={saveToken} token={token} role={role} />
                }
                {
                  currentPage === 4 && <Info user={user} type="password" setToken={saveToken} token={token} role={role} />
                }
              </div>
            </div>
        </>
      }
    </div>
  )
}

export default Profile