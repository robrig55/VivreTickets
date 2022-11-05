import './header.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../provider/UserProvider';

const Header = () => {
  
  const navigate = useNavigate()

  const { id, token, role, saveToken } = useContext(UserContext)

  const [logText, setLogText] = useState('LOG-IN')
  
  useEffect(() => {
    if(!token) {
      setLogText('LOG-IN')
    } else {
      setLogText('LOG-OUT')
    }
  }, [token])

  return (
    <div className='navbar'>
      <img src="https://i.ibb.co/s6Szwj5/Logo.png" alt="Logo" border="0" className='logo' />
      <div className='nav-links'>
        <div className='nav-link' onClick={ () => navigate('/') }> HOME </div>
        {
          role === 'admin' ?
            <div className='nav-link' onClick={ () => navigate('/manage') }> MANAGE </div> :
            <></>
        }
        {
          !token ?
          <></> :
            role === 'user' ?
              <>
                <div className='nav-link' onClick={ () => navigate('/setup_event/new') }> SET UP EVENT </div> 
                <div className='nav-link' onClick={ () => navigate(`/profile/${id}`) }> MY PROFILE </div> 
              </> :
              <></>
        }
        <div className='nav-link' onClick={ () => { 
          if(token) saveToken({})
          navigate('/signin') 
        }}>
          { logText } 
        </div> 
      </div>
    </div>
  )
}

export default Header;