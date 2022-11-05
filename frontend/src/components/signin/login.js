import React, { useState, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import Input from '../utils/basic/input';
import Button from '../utils/basic/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginUser } from '../apis';

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const { saveToken } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await loginUser({
      email: email.toLowerCase().replace(/\s/g, ''),
      password: pass
    });
    console.log(token)
    if(token.result === 'Login Success') {
      saveToken(token)
      toast.success('Successfully Login')
      navigate('/')
    } else if(token === 'Invalid password') {
      toast.warning('You input wrong information')
    } else {
      toast.warning("Something went wrong")
    }
  }

  return (
    <div className={props.className}>
      <p className='logo m-0'> SIGN IN </p>
      <Input 
        className="input mt-20 w-100"
        type="text"
        placeholder="EMAIL"
        id="email"
        value={email}
        onChange={
          (e) => {
            setEmail(e.target.value)
          }
        }
      />
      <Input
        className="input mt-20 w-100"
        type="password"
        placeholder="PASSWORD"
        id="password"
        value={pass}
        onChange={
          (e) => {
            setPass(e.target.value)
          }
        }
      />
      <Button
        className="btn btn-normal mt-20"
        content="Login"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default Login