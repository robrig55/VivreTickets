import React, { useState } from 'react';
import Input from '../utils/basic/input';
import Button from '../utils/basic/button';
import { CountryDropdown } from 'react-country-region-selector';
import { registerUser } from '../apis';
import { toast } from 'react-toastify';

const Register = (props) => {

  const [fname, setFName] = useState('')
  const [sname, setSName] = useState('')
  const [country, setCountry] = useState('')
  const [pnumber, setPNumber] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleChangeInput = (e) => {
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      setPNumber(e.target.value);
    }
  }    

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await registerUser({
      email: email.toLowerCase().replace(/\s/g, ''),
      password: pass,
      f_name: fname,
      l_name: sname,
      country: country,
      phone: pnumber,
      register_date: Date.now(),
      role: 'user'
    })
    if(token.result === 'Success') {
      toast.success("We sent verification message to your email, please check your inbox")
    } else {
      toast.warning("Something went wrong, please try again.")
    }
  }

  return (
    <div className={props.className}>
      <p className='logo m-0'> REGISTER </p>
      <Input 
        className="input mt-20 w-100"
        type="text"
        placeholder="FIRST NAME"
        id="fname"
        value={fname}
        onChange={
          (e) => {
            setFName(e.target.value)
          }
        }
      />
      <Input
        className="input mt-20 w-100"
        type="text"
        placeholder="SECOND NAME"
        id="sname"
        value={sname}
        onChange={
          (e) => {
            setSName(e.target.value)
          }
        }
      />
      <CountryDropdown 
        className="input mt-20 w-100"
        value={country}
        onChange={
          (val) => setCountry(val)
        }
      />
      <Input
        className="input mt-20 w-100"
        type="text"
        placeholder="PHONE NUMBER"
        id="pnumber"
        value={pnumber}
        onChange={handleChangeInput}
      />
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
        content="Register"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default Register