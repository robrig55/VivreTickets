import React, { useState, useEffect } from 'react'

import styles from './manage.module.css'
import LoadingScreen from '../utils/loadingScreen'

const Total = (props) => {

  const whole_data = props.data

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    preLoading()
  }, [whole_data])

  const preLoading = () => {
    const temp = whole_data.seat_name.map((val, index) => {
      return {
        section: val,
        price: parseInt(whole_data.seat_price[index]),
        quantity: parseInt(whole_data.seat_ticket_count[index]) - whole_data.seat_ticket_sale_count[index]
      }
    } )
    setData(temp)
    setLoading(false)
  }

  var sum_price = 0;
  var sum_quantity = 0;

  const drawData = () => 
    data.map((val, index) => {

      sum_price += val.quantity * val.price
      sum_quantity += val.quantity

      return (
        <tr key={index}>
          <td className={styles.td}>
            { val.section }
          </td>
          <td className={styles.td}>
            { val.quantity }
          </td>
          <td className={styles.td}>
            { val.price }
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
          <table className={`${styles.table} m-10 w-100`} >
            <thead>
              <tr>
                <th className={styles.th}>
                  SECTION
                </th>
                <th className={styles.th}>
                  QUANTITY
                </th>
                <th className={styles.th}>
                  PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {
                drawData()
              }
              <tr>
                <td colSpan={'3'} className={styles.td}>
                  <div className={styles.divider} />
                </td>
              </tr>
              <tr>
                <td className={styles.td}> Total </td>
                <td className={styles.td}> { sum_quantity } </td>
                <td className={styles.td}> { sum_price } </td>
              </tr>
            </tbody>
          </table>
        </>
      }
    </>
  )
}

export default Total