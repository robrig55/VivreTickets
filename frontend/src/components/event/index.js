import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import User from './user'
import TicketManage from './manage'

import styles from './index.module.css'
import { getEvent } from '../apis'
import LoadingScreen from '../utils/loadingScreen'
import moment from 'moment'
import { UserContext } from '../provider/UserProvider';
import { toast } from 'react-toastify'

import {
  TwitterIcon,
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from 'react-share'

const Event = (props) => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  let { eventId } = useParams();
  const navigate = useNavigate()

  const { token, role, user } = useContext(UserContext)

  useEffect( () => {
    async function func() {
      getEvent(eventId)
        .then((data) => {
          if(data === 'Not found') {
            toast.error('Event not found');
            navigate('/')
          }
          setData(data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
    func()
  }, [role, user, eventId, navigate])

  // if(!token) {
  //   toast.warning('Please Sign in')
  //   return <Navigate to={{pathname: '/signin'}} />
  // }

  // if(role === 'admin') {
  //   toast.warning('Only users can see this page, please sign in with user information')
  //   return <Navigate to={{pathname: '/signin'}} />
  // }

  return (
    <div className={`${styles.event} w-100`}>
      {
        loading === true ?
          <LoadingScreen />
          :
          <>
            <div 
              style={{backgroundImage: `url(${data.banner_url})`}} 
              className={`${styles.banner} w-100`}
            />
            <div className={`${styles.content} w-100`}>
              <div className={`${styles.title} w-100 mt-20`}>
                <span className='bold-font'> {data.title} </span>
                <span className='normal-font'> Venue: {data.venue} </span>
                <span className='normal-font'> Country: {data.country} </span>
                <span className='normal-font'> Organized by {data.organization} </span>
                <span className='normal-font'> Date: {moment(new Date(data.end_date)).format('YYYY-MM-DD hh:mm')} </span>
              </div>
              <div className='w-100' style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '15px'
              }}>
                {/* <img src='/pngs/facebook.png' alt="Facebook" className={styles.icons} /> */}
                {/* <img src='/pngs/twitter.png' alt="Twitter" className={styles.icons} /> */}
                {/* <img src='/pngs/gmail.png' alt="Gmail" className={styles.icons} /> */}
                {/* <img src='/pngs/instagram.png' alt="Instagram" className={styles.icons} /> */}
                <FacebookShareButton url={window.location} title={data.title}>
                  <FacebookIcon className={styles.icons} borderRadius={10} />
                </FacebookShareButton>

                <TwitterShareButton url={window.location}>
                  <TwitterIcon className={styles.icons} borderRadius={10} />
                </TwitterShareButton>

                <EmailShareButton 
                  url={window.location}
                  subject={data.title}
                  body={`
                    Title: ${data.title} \n 
                    Organized By: ${data.organization} \n 
                    Venue: ${data.venue} \n 
                    Country: ${data.country} \n 
                    Date: ${moment(new Date(data.start_date)).format('YYYY-MM-DD hh:mm')} - ${moment(new Date(data.end_date)).format('YYYY-MM-DD hh:mm')}
                  `}
                >
                  {/* <EmailIcon className={styles.icons} borderRadius={10} /> */}
                  <img src='/pngs/gmail.png' alt="Gmail" className={styles.icons} />
                </EmailShareButton>

                <WhatsappShareButton url={window.location} title={data.title} >
                  <WhatsappIcon className={styles.icons} borderRadius={10} />
                </WhatsappShareButton>
              </div>
              <div className={`${styles.tickets} w-100`}>
                {
                  data.creator === user ?
                    <TicketManage data={data} token={token} />
                    : <></>
                }
                <User data={data} user={user} token={token} role={role} /> 
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Event