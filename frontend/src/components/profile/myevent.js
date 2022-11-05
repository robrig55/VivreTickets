import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css'
import moment from 'moment'

const MyEvent = (props) => { 
  const data = props.data
  const navigate = useNavigate()

  const drawData = () => 
    data.map((val, index) => {
      return (
        <tr key={index} onClick={() => {navigate(`/event/${val._id}`)}} className={styles.tr}>
          <td className={styles.td}> {moment(val.start_date).format("YYYY-MM-DD hh:mm")} </td>
          <td className={styles.td}> {val.title} </td>
        </tr>
      )
    })
 
  return (
    <div className={`${styles.my_event} w-100`}>
      <table className={`w-100 ${styles.table}`}>
        <tbody>
          {
            drawData()
          }
        </tbody>
      </table>
    </div>
  )
}

export default MyEvent