import React, { useState, useEffect } from 'react'
import LoadingScreen from '../utils/loadingScreen'

import styles from './manage.module.css'

import { getActivity } from '../apis'
import moment from 'moment'

const Purchases = (props) => {

  const event_id = props.id
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    preLoading()
  }, [event_id])

  const preLoading = async () => {
    const res = await getActivity(event_id)
    setData(res)
    setLoading(false)
  }

  const drawData = () => 
    data.map((val, index) => {
      var sum = 0
      val.count.map((val, index) => {
        sum += parseInt(val)
      })
      return (
        <tr key={index}>
          <td className={styles.td}>
            { moment(val.date).format('YYYY-MM-DD hh:mm') }
          </td>
          <td className={styles.td}>
            { sum } TICKETS TO { val.name }
          </td>
        </tr>
      )
    })

  return (
    <>
      {
        loading === true ?
          <LoadingScreen /> 
          :
          <>
            <table className={`${styles.table} m-10 w-100`}>
              <tbody>
                {
                  drawData()
                }
              </tbody>
            </table>
          </>
      }
    </>
  )
}

export default Purchases;