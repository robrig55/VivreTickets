import React, { useState, useEffect } from 'react';

import styles from './index.module.css';

import { getEvents } from '../apis'
import LoadingScreen from '../utils/loadingScreen'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const EventManage = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getEvents()
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  
  const drawData = () => 
    data.map((val, index) => {
      return (
        <tr className={styles.tr} key={index} onClick={() => {
          navigate(`/event/${val._id}`)
        }}>
          <td className={styles.td}>
            {val.title}
          </td>
          <td className={styles.td}>
            {val.creator}
          </td>
          <td className={styles.td}>
            {val.organization}
          </td>
          <td className={styles.td}>
            {val.country}
          </td>
          <td className={styles.td}>
            {moment(new Date(val.end_date)).format('YYYY-MM-DD hh:mm')}
          </td>
        </tr>
      )
    })

  return (
    <div className={`${styles.users} w-100`} style={{overflow: 'auto'}}>
      {
        loading === true ?
          <LoadingScreen />
          :
          <table className={`${styles.table} w-100`}>
            <thead>
              <tr>
                <th className={styles.th}> Title </th>
                <th className={styles.th}> User </th>
                <th className={styles.th}> Organized By </th>
                <th className={styles.th}> Country </th>
                <th className={styles.th}> End Date </th>
              </tr>
            </thead>
            <tbody>
              {
                drawData()
              }
            </tbody>
          </table>
      }
    </div>
  )
}

export default EventManage;