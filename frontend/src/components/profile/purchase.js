import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';
import moment from 'moment';

const Purchase = (props) => { 
  const data = props.data
  const navigate = useNavigate()

  console.log(data)

  const drawData = () => 
    data.map((val, index) => {
      var sum = 0
      val.count.map((val, index) => {
        sum += parseInt(val)
      })
      return (
        <tr key={index} onClick={() => {navigate(`/receipt/${data[index]._id}`)}} className={styles.tr}>
          <td className={styles.td}> {moment(val.date).format('YYYY-MM-DD hh:mm')} </td>
          <td className={styles.td}> {val.eventTitle} ( { sum } ) </td>
        </tr>
      )
    })
 
  return (
    <div className={`${styles.purchase} w-100`}>
      <table className={`${styles.table}`}>
        <tbody>
          {
            drawData()
          }
        </tbody>
      </table>
    </div>
  )
}

export default Purchase