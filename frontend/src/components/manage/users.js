import React, { useState, useEffect } from 'react';

import styles from './index.module.css';
import { getUsers } from '../apis';
import LoadingScreen from '../utils/loadingScreen'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const UserManage = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function func() {
      getUsers()
        .then((data) => {
          setData(data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    func()

  }, [])

  const drawData = () => 
    data.map((val, index) => {
      return (
        <tr className={styles.tr} key={index} onClick={() => {
          navigate(`/profile/${val._id}`)
        }}>
          <td className={`${styles.td} w-20`}>
            {val.f_name} {val.l_name}
          </td>
          <td className={`${styles.td} w-20`}>
            {val.email}
          </td>
          <td className={`${styles.td} w-20`}>
            {val.phone}
          </td>
          <td className={`${styles.td} w-20`}>
            {val.country}
          </td>
          <td className={styles.td}>
            {moment(new Date(val.register_date)).format('YYYY-MM-DD hh:mm')}
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
                  <th className={`${styles.th} w-20`}> Name </th>
                  <th className={`${styles.th} w-20`}> Email </th>
                  <th className={`${styles.th} w-20`}> Phone Number </th>
                  <th className={`${styles.th} w-20`}> Country </th>
                  <th className={`${styles.th} w-20`}> Registered Since </th>
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

export default UserManage;