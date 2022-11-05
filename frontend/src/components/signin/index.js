import React from 'react'
import './index.css'
import Login from './login'
import Register from './register'

const SignIn = (props) => {
    return (
        <div className='signin'>
            <Login className='login p-20' notif={props.notif} />
            <Register className='register p-20' />
        </div>
    )
}

export default SignIn