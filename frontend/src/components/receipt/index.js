import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { getActivityById, getEvent, getUser } from '../apis';
import LoadingScreen from '../utils/loadingScreen';
import { UserContext } from '../provider/UserProvider';
import { marks } from '../utils/currency';
import moment from 'moment';

import styles from './index.module.css'

const Receipt = () => {

  const { token } = useContext(UserContext)

  let { activityId } = useParams();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    if(activityId) {
      handleGetActivity()
    }
  }, [activityId])

  if(!token) {
    return <Navigate to={{pathname: '/signin'}} />
  }

  const handleGetActivity = async () => {
    const actions = await getActivityById(activityId)
    const action = actions.data
    const event = await getEvent(action.eventId)
    const users = await getUser(event.creator)
    const user = users[0]
    setData({
      date: action.date,
      transactionId: action.orderId,
      customer: {
        name: `${user.f_name} ${user.l_name}`,
        email: user.email,
        phone: user.phone
      },
      eventDetail: {
        name: event.title,
        venue: event.venue,
        date: event.end_date,
        currency: event.currency,
        organize: event.organization,
        section_name: event.seat_name,
        section_price: event.seat_price,
        section_quantity: action.count
      }
    })
    setLoading(false)
  }

  const drawBody = () => 
    data.eventDetail.section_name.map((val, index) => {
      return (
        <tr key={index}>
          <td className={styles.td}> {val} </td>
          <td className={styles.td}> {data.eventDetail.section_quantity[index]} </td>
          <td className={styles.td}> {marks[data.eventDetail.currency]}{data.eventDetail.section_price[index]}  </td>
        </tr>
      )
    })

  const totalPrice = () => {
    var sum = 0.0;
    data.eventDetail.section_quantity.map((val, index) => {
      sum = sum + (parseFloat(data.eventDetail.section_price[index]) * parseInt(val))
    })
    return sum
  }

  return (
    <div className={`${styles.receipt} p-10`}>
      {
        loading === true ?
          <LoadingScreen />
          :
          <>
            <div className={`${styles.header}`}>
              <img alt="logo" src='https://i.ibb.co/s6Szwj5/Logo.png' className={styles.logo} />
              <div className={styles.detail}>
                <span style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  justifyContent: 'flex-end',
                }}> 
                  <div>Payment&nbsp;Date:</div> 
                  <div> {moment(data.date).format('YYYY-MM-DD hh:mm')}</div>
                </span>
                <span style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  justifyContent: 'flex-end'
                }}> 
                  <div> Transaction&nbsp;ID: </div>
                  <div> {data.transactionId} </div>
                </span>
              </div>
            </div>
            <div className={`${styles.divider} mt-20`} />
            <div className={`${styles.content} mt-20`}>
              <div className={styles.event_info}>
                <div className={styles.user_info}>
                  <span className={styles.myStyle}> CUSTOMER </span> 
                  <span className={styles.myStyle}> { data.customer.name } </span>
                  <span className={styles.myStyle}> { data.customer.email } </span>
                  <span className={styles.myStyle}> { data.customer.phone } </span>
                </div>
                <div className={styles.event_detail}>
                  <span> EVENT DETAILS </span>
                  <span className={styles.myStyle}> { data.eventDetail.name } </span> 
                  <span className={styles.myStyle}> { data.eventDetail.venue } </span> 
                  <span className={styles.myStyle}> { moment(data.eventDetail.date).format('YYYY-MM-DD hh:mm') } </span>
                  <span className={styles.myStyle}> { data.eventDetail.organize } </span> 
                  <span className={styles.myStyle}> { data.eventDetail.email } </span>
                </div>
              </div>
              <div className={`${styles.purchase_info} mt-20`}>
                <table className={`w-100 ${styles.table}`}>
                  <thead>
                    <tr>
                      <th className={styles.th}> SECTION </th>
                      <th className={styles.th}> QUANTITY </th>
                      <th className={styles.th}> PRICE </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      drawBody()
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.divider} /> 
            <div className={styles.result}>
              <span style={{
                textDecorationLine: 'underline',
                textDecorationThickness: 'from-font',
                textDecorationStyle: 'double',
                textDecorationColor: 'initial'
              }}> TOTAL:&nbsp;{marks[data.eventDetail.currency]}{totalPrice()}  </span>
            </div>
            <div className={styles.thanks}>
              <span> {'THANK YOU FOR USING VIVRE TICKETS'} </span> 
            </div>
            <div className={styles.note}>
              <span> Note </span>
              <span className='mt-10'>1. For any concerns, please contact the vendor directly</span>
              <span>2. Purchase is upon the terms and conditions of the vendor</span>
              <span>3. For an official receipt, please contact the vendor</span>  
            </div>
          </>
      }
    </div>
  )
}

export default Receipt