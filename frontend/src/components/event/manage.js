import React, { useState } from 'react'

import styles from './index.module.css'

import Purchases from './purchases'
import Total from './total'
import { deleteEvent, publishEvent } from '../apis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingScreen from '../utils/loadingScreen'

const TicketManage = (props) => {

  const data = props.data
  const token = props.token
  const navigate = useNavigate()

  const [page, setPage] = useState(3)
  const [pbsh, setPbsh] = useState(data.published)
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id) => {
    const res = await deleteEvent(token, data._id)
    if(res.deletedCount === 1) {
      setLoading(false)
      toast.success('Event Deleted')
      navigate('/')
    }
  }

  const handlePublish = async (_id) => {
    const upt = data.published ? false : true
    setPbsh(upt)
    const res = await publishEvent(token, {
      id: _id,
      status: upt
    })
    if(res.result === 'Success') {
      if(upt === true) {
        toast.success('Event successfully published')
      } else {
        toast.success('Event successfully unpublished')
      }
    }
    setLoading(false)
  }
  
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }}>
      {
        loading ? <LoadingScreen /> :
      <>
      <div 
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',

          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#52c7c1',
        }} className='mt-10' />
        <div className={`${styles.head_menu} w-100`}>
          <div 
            className={
              page !== 1 ? 
                `${styles.nav} ${ styles.clickable } normal-font` :
                `${styles.nav} ${ styles.clickable } normal-boldfont`
            }
            onClick={() => { navigate(`/setup_event/${data._id}`) }}
          > 
            SETTINGS 
          </div>
          <span className='normal-font ml-10 mr-10'> | </span>
          <div 
            className={
              page !== 2 ? 
                `${styles.nav} ${ styles.clickable } normal-font` :
                `${styles.nav} ${ styles.clickable } normal-boldfont`
            }
            onClick={() => {
              setLoading(true)
              handlePublish(data._id)
            }}
          > 
            { pbsh ? 'UNPUBLISH' : 'PUBLISH' } 
          </div>
          <span className='normal-font ml-10 mr-10'> | </span>
          <div 
            className={
              page !== 3 ? 
                `${styles.nav} ${ styles.clickable } normal-font` :
                `${styles.nav} ${ styles.clickable } normal-boldfont`
            }
            onClick={() => { setPage(3) }}
          > 
            PURCHASES 
          </div>
          <span className='normal-font ml-10 mr-10'> | </span>
          <div 
            className={
              page !== 4 ? 
                `${styles.nav} ${ styles.clickable } normal-font` :
                `${styles.nav} ${ styles.clickable } normal-boldfont`
            }
            onClick={() => { setPage(4) }}
          > 
            TOTAL
          </div>
          <span className='normal-font ml-10 mr-10'> | </span>
          <div 
            className={
              page !== 5? 
                `${styles.nav} ${ styles.clickable } normal-font` :
                `${styles.nav} ${ styles.clickable } normal-boldfont`
            }
            onClick={ () => {
              setLoading(true)
              handleDelete(data._id)
            }}
          > 
            DELETE
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#52c7c1',
        }} />
      </div>
      <div className={`${styles.details} w-75`}>
        { page === 3 && <Purchases id={data._id} /> }
        { page === 4 && <Total data={data} /> }
      </div>
      </>
      }
    </div>
  )
}

export default TicketManage