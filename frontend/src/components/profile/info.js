import React, { useState } from 'react';
import Input from '../utils/basic/input';
import Button from '../utils/basic/button';
import { changeEmail, changePassword, updateActivity } from '../apis';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';
import { toast } from 'react-toastify';

const Info = (props) => {

  const [text, setText] = useState('')
  const [retype, setRetype] = useState('')

  const text_type = props.type
  const token = props.token
  const user = props.user
  const setToken = props.setToken
  const navigate = useNavigate()

  const handleSave = () => {
    if(text_type === 'email') {
      updateActivity(token, {
        before_mail: user,
        after_mail: text
      })
      .then((res) => { console.log(res) })
      .catch(err => console.log(err))
      changeEmail(token, {
        before_mail: user,
        after_mail: text
      })
      .then((res) => {
        setToken({})
        toast.success('Email changed.')
        navigate('/signin') 
        console.log(res) 
      })
      .catch(err => console.log(err))
    } else if(text_type === 'password') {
      changePassword(token, {
        email: user,
        password: text
      })
      .then((res) => {
        setToken({})
        toast.success('Password changed.')
        navigate('/signin')
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className={`${styles.user_info} p-20`}>
      <Input 
        className='input w-100'
        type={ text_type === 'email' ? "text" : 'password' }
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={text_type === "email" ? "EMAIL" : "PASSWORD"}
        id={text_type === "email" ? "change_email" : "change_password"}
      />
      <Input 
        className='input mt-20 w-100' 
        type={ text_type === 'email' ? "text" : 'password' }
        value={retype}
        onChange={(e) => setRetype(e.target.value)}
        placeholder={ `RETYPE ${ text_type === "email" ? "EMAIL" : "PASSWORD" }`}
      />
      <Button
        className='btn btn-normal mt-20'
        content="SAVE"
        onClick={handleSave}
      />
    </div>
  )
}

export default Info;