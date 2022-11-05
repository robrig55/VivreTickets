import React, { useState, useContext, useEffect } from 'react'
import Input from '../utils/basic/input'
import { CountryDropdown } from 'react-country-region-selector';

import DatePicker from "react-datepicker";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import "react-datepicker/dist/react-datepicker.css";

import styles from './index.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { url, addEvent, uploadImage, getEvent, updateEvent, getTermsConditions } from '../apis';
import { UserContext } from '../provider/UserProvider';
import { toast } from 'react-toastify';
import LoadingScreen from '../utils/loadingScreen';
import { currencies } from '../utils/currency';

const SetupEvent = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const { token, user } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [organize, setOrganize] = useState('')
  const [venue, setVenue] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('USD')

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [banner, setBanner] = useState('')
  const [seatPlan, setSeatPlan] = useState('')
  const [paypal, setPaypal] = useState('')

  const [seatCount, setSeatCount] = useState(1)

  const [quantity, setQuantity] = useState([0])
  const [sectionName, setSectionName] = useState([''])
  const [sectionPrice, setSectionPrice] = useState([0])
  const [terms, setTerms] = useState(false)
  const [open, setOpen] = useState(false)
  const [termsContent, setTermsContent] = useState('')

  const [loading, setLoading] = useState(id === 'new' ? false : true)

  useEffect(() => {
    async function func() {
      const res = await getTermsConditions()
      setTermsContent(res.content)
      if(id !== 'new') {
        getEvent(id)
          .then((data) => {
            if(data === 'Not found') {
              toast.error('Event not found')
              navigate('/')
            }
            console.log(data)
            setTitle(data.title)
            setOrganize(data.organization)
            setVenue(data.venue)
            setCountry(data.country)
            setCurrency(data.currency)
            setStartDate(new Date(data.start_date))
            setEndDate(new Date(data.end_date))
            setBanner(data.banner_url)
            setSeatPlan(data.seatplan_url)
            setPaypal(data.paypal_email)
            setSeatCount(data.seat_name.length)
            setSectionName(data.seat_name)
            setSectionPrice(data.seat_price)
            setQuantity(data.seat_ticket_count)
            setLoading(false)
          })
      }
    }
    func()
  }, [])

  if(!token) {
    return <Navigate to={{pathname: '/sigin'}} />
  }

  const handleSectionName = (e, index) => {
    const nextSection = sectionName.map((val, i) => {
      if(i === index) {
        return e.target.value
      } else {
        return val
      }
    })
    setSectionName(nextSection)
  }

  const handleSectionPrice = (e, index) => {
    const nextSection = sectionPrice.map((val, i) => {
      if(i === index) {
        return e.target.value
      } else {
        return val
      }
    })
    setSectionPrice(nextSection)
  }

  const handleTicketCount = (e, index) => {
    const nextSection = quantity.map((val, i) => {
      if(i === index) {
        return parseInt(e.target.value)
      } else {
        return val
      }
    })
    setQuantity(nextSection)
  }

  const drawSeats = () => 
    Array(seatCount).fill(0).map((_, index) => {
      return (
        <tr key={index}>
          <td className={styles.td}>
            <Input 
              className='input w-100'
              type="text"
              placeholder=""
              value={sectionName[index]}
              onChange={(e) => handleSectionName(e, index)}
            />
          </td>
          <td className={styles.td}>
            <Input 
              className='input w-100'
              type="number"
              step="0.1"
              placeholder=""
              value={sectionPrice[index]}
              onChange={(e) => handleSectionPrice(e, index)}
            />
          </td>
          <td className={styles.td}>
            <Input 
              className='input w-100'
              type="number"
              placeholder=""
              value={quantity[index]}
              onChange={(e) => handleTicketCount(e, index)}
            />
          </td>
        </tr>
      )
    })
  
  const handleAdd = () => {
    var nextCount = seatCount + 1
    setSeatCount(nextCount)
    setSectionName([
      ...sectionName, ''
    ]);
    setSectionPrice([
      ...sectionPrice, 0
    ]);
    setQuantity([
      ...quantity, 0
    ])
  }
  
  const handleSave = async (e) => {
    e.preventDefault()
    if(!terms) {
      toast.error("Please check terms and policy")
      setLoading(false)
      return ;
    }
    if(!user || !title || !organize || !venue || !country || !currency ||
       !startDate || !endDate || !banner || !seatPlan || !paypal 
    ) {
      toast.error("Please input all fields")
      setLoading(false)
      return ;
    }
    const req = {
      creator: user,
      title: title,
      organization: organize,
      venue: venue,
      country: country,
      currency: currency,
      start_date: startDate,
      end_date: endDate,
      banner_url: banner,
      seatplan_url: seatPlan,
      paypal_email: paypal,
      seat_name: sectionName,
      seat_price: sectionPrice,
      seat_ticket_count: quantity,
      seat_ticket_sale_count: quantity
    }
    let response
    if(id === 'new') {
      response = await addEvent(token, req);
    } else {
      response = await updateEvent(token, id, req)
    }
    if(response.result === 'success') {
      if(id === 'new') {
        toast.success("Event Created")
      } else {
        toast.success("Event Updated")
      }
      navigate(`/event/${response.id}`)
    } else {
      toast.warning("Something went wrong, please try again")
    }
    setLoading(false)
  }

  const fileUpload = async (e, type) => {
    const img = e.target.files[0]
    console.log(img)
    const response = await uploadImage(img);
    if(type === 'banner') {
      setBanner(`${url}/${response.data.data.name}`)
    } else if(type === 'seat') {
      setSeatPlan(`${url}/${response.data.data.name}`)
    }
  }

  return (
    <div className={`${styles.setup_event} w-100`}>
      {
        loading ? 
        <LoadingScreen /> 
        :
        <>
        <Modal 
          open={open}
          onClose={() => { setOpen(false) }}
        >
          <div
            style={{
              marginTop: '30px'
            }}
            dangerouslySetInnerHTML={{ __html: termsContent}}
          >
          </div>
        </Modal>
        <p className={`${styles.logo}`}> SET UP EVENT </p>
        <div className={`${styles.content}`}>
          <Input 
            className='input mt-20 w-100'
            type="text"
            placeholder="TITLE"
            id="title"
            value={title}
            onChange={
              (e) => {
                setTitle(e.target.value)
              }
            }
          />
          <Input
            className='input mt-20 w-100'
            type="text"
            placeholder="ORGANIZED BY"
            id="organize"
            value={organize}
            onChange={
              (e) => {
                setOrganize(e.target.value)
              }
            }
          />
          <Input
            className='input mt-20 w-100'
            type="text"
            placeholder="VENUE"
            id="organize"
            value={venue}
            onChange={
              (e) => {
                setVenue(e.target.value)
              }
            }
          />

          <div className={`${styles.country} mt-20 w-100`}>
            <CountryDropdown 
              value={country}
              onChange={
                (val) => setCountry(val)
              }
              classes={`input w-100 mr-10 ${styles.country_select}`}
            />
            <select 
              className={`input w-100 ${styles.currency}`} 
              value={currency}
              onChange={
                (e) => setCurrency(e.target.value)
              }
            >
              {
                currencies.map((val, index) => {
                  return (
                    <option value={val} key={index}> {val} </option>
                  )
                })
              }
            </select>
          </div>

          <div className={`${styles.daterange} mt-20 w-100`}>
            <DatePicker 
              className='input w-100'
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
            />
            <span style={{width: '10px'}}></span>
            <DatePicker 
              className='input w-100'
              selected={endDate} 
              onChange={(date) => setEndDate(date)} 
            />
          </div>

          <div className={`${styles.bannerUploader} mt-20 w-100`}>
            <div style={{
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <span className='pr-10'> Upload Banner:  </span>
              <span style={{
                maxWidth: '50%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              > { banner } </span>
            </div>
            <div style={{
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>              
              <input 
                className={styles.input}
                type="file"
                accept='image/*'
                onChange={(e) => {
                  fileUpload(e, 'banner')
                }}
              />
              <span> (Resize to 1000*521px) </span>
            </div>
          </div>

          <div className={`${styles.seat_plan} mt-10 w-100`}>
            <span className='pr-10'> Upload Seat Plan: </span>
            <span style={{
                maxWidth: '50%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            > { seatPlan } </span>
            <input 
              className={styles.input}
              type="file"
              accept='image/*'
              onChange={(e) => {
                fileUpload(e, 'seat')
              }}
            />
          </div>
          
          <div className={`${styles.payment} mt-20 w-100`}>
            <span> PayPal&nbsp;Email:&nbsp; </span>
            <Input
              className='input w-100'
              type="text"
              placeholder="PayPal Address"
              id="paypal"
              value={paypal}
              onChange={
                (e) => {
                  setPaypal(e.target.value)
                }
              }
            />
          </div>

          <div className={`${styles.seats} mt-20 w-100`}>
            <span> Seats: </span>
            <div className={`${styles.section} w-100`}>
              <table className={`w-100 ${styles.table}`}>
                <thead>
                  <tr>
                    <th className={styles.th}> Section&nbsp;Name </th>
                    <th className={styles.th}> Price </th>
                    <th className={styles.th}> #&nbsp;of&nbsp;Tickets </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    drawSeats()
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.btn_add} onClick={handleAdd}>
            <span> (add&nbsp;more) </span>
          </div>

          <div className={`${styles.accept_term} mt-20 w-100`}>
            <div className={`${styles.check_box} p-20`}>
              <input type="checkbox" id="terms" name="terms" value={terms} onClick={() => setTerms(!terms)}/>
              <label 
                htmlFor="terms"
                style={{
                  color: 'black',
                  display: 'flex',
                  flexFlow: 'row wrap'
                }}
              > 
                &nbsp;I accept the &nbsp;<p style={{textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationWidth: '2px'}} onClick={() => {setOpen(true)}}>Terms and Conditions</p> 
              </label>
            </div>
            <div className={`${styles.saveEvent} mt-10 p-20`} onClick={(e) => {
              setLoading(true)
              handleSave(e)
            }}>
              <span
                style={{
                  color: 'white'
                }}
              > SAVE 
              </span>
            </div>
          </div>
        </div>
        </>
      }
    </div>
  )
}

export default SetupEvent