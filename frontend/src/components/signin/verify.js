import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../apis'
import LoadingScreen from '../utils/loadingScreen'
import { toast } from 'react-toastify'

const Verify = () => {

    const { key } = useParams()
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(key) {
            handleVerify()
        }
    }, [key])

    const handleVerify = async () => {
        const res = await verifyEmail(key)
        if(res.message === 'Success') {
            toast.success('You successfully verified your email.')
            setText('You successfully verified your email. We will redirect in a few minutes')
            navigate('/signin')
        } else {
            toast.info('Something went wrong. Please try again.')
            setText('Something went wrong. Please try again after a few minutes')
        }
        setLoading(false)
    }

    return (
        <div
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}
        >
            {
                !key ?
                <>
                    <span> We just sent verification message to your email. </span>
                    <span> Please check your inbox. </span>
                </>
                :
                loading ?
                    <LoadingScreen />
                    :
                    <span> {text} </span>
            }
        </div>
    )
}

export default Verify