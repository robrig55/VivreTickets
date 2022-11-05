import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../utils/basic/input';
import { BsSearch } from 'react-icons/bs'
import Button from '../utils/basic/button';

import styles from './index.module.css';
import { getEvents } from '../apis';

import LoadingScreen from '../utils/loadingScreen';
import { getFormatDate } from '../utils/formatDate';

import { UserContext } from '../provider/UserProvider';
import { useContext } from 'react';

const Tickets = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [searchStr, setSearchStr] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getEvents()
      .then((data) => {
        const result = data.filter( evt => evt.published === true )
        setData(result)
        setSearchData(result)
        setLoading(false)    
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(searchStr !== '') {
      const result = data.filter(word => word.title.includes(searchStr))
      setSearchData(result)
    } else {
      setSearchData(data)
    }
  }, [searchStr])


  const drawTickets = () => 
    searchData.map((data, index) => {
      const showDate = getFormatDate(data.end_date);
      return (
        <tr key={index}>
          <td 
            className={styles.td} 
          >
            <span> {showDate[0]} </span> <br/>
            <span className={styles.span_bold}> {showDate[1]} </span> <br/>
            <span> {showDate[2]} </span> <br/>
          </td>
          <td className={styles.td}>
            <div className={styles.table_content}>
              <div className={styles.table_content_body}>
                <div className={styles.header}>
                  { data.title }
                </div>
                <div className={styles.content}>
                  <p className={styles.desc}> { data.venue } </p>
                  <span 
                    style={{
                      padding: '0px 5px'
                    }}
                  > 
                    | 
                  </span>
                  <p className={styles.desc}> { data.country } </p>
                </div>
              </div>
              <Button 
                className="btn btn-red m-10"
                content="Find Tickets"
                onClick={
                  () => {
                    navigate(`/event/${data._id}`)
                  }
                }
              />
            </div>
          </td>
        </tr>
      )
    })    

  return (
    <div className={`${styles.tickets} w-100`} style={{overflow: 'auto'}}>
      {
        loading ?
        <LoadingScreen /> :
        <>
          <div className={`${styles.search} mt-20`}>
            <Input
              className='input w-100'
              type="text"
              placeholder='SEARCH'
              value={searchStr}
              onChange={
                (e) => setSearchStr(e.target.value)
              }
              icon={
                <BsSearch 
                  color='#52c7c1'
                />
              }
            />
          </div>
          <div className='mt-20 w-100'>
              <table className={`${styles.table} w-100 table`}>
                <thead>
                  <tr>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    drawTickets()
                  }
                </tbody>
              </table>
          </div>
        </>
      }
    </div>
  )
}

export default Tickets