import React, { useState, useEffect } from 'react';
import Button from '../utils/basic/button';

import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';
import { buyTicket, getUser, updateEventCount } from '../apis';
import { toast } from 'react-toastify';
import PayPalCusBtn from '../utils/PayPalButtonCus';

const User = (props) => {

    const data = props.data
    const user = props.user
    const role = props.role
    const token = props.token
    const navigate = useNavigate()

    const [count, setCount] = useState(Array(data.seat_ticket_count.length).fill(0))

    var rest = 0;
    
    count.map((val, index) => {
        const rest_count = parseInt(data.seat_ticket_sale_count[index])
        rest += rest_count
    })

    const [soldOut, setSoldOut] = useState(rest === 0 ? true : false)

    const handleSelectCount = (e, index) => {
        const next = count.map((val, i) => {
            if(i === index) {
                return e.target.value
            } else {
                return val
            }
        })
        setCount(next)
    }
    
    const drawTable = () =>
        data.seat_name.map((val, index) => {

            const price = data.seat_price[index]
            const rest = parseInt(data.seat_ticket_sale_count[index])
            const quantity = Array( rest + 1).fill().map((_, index) => index)
            const currency = data.currency

            return (
            <tr key={index}>
                <td className={styles.td}> { val } </td>
                <td className={styles.td}> { price }&nbsp;({currency}) </td>
                <td className={styles.td}>
                    <select 
                        className='input w-100'
                        value={count[index]}
                        onChange={(e) => {
                            handleSelectCount(e, index)
                        }}
                        placeholder="Count"
                    >
                        {
                            quantity.map((val, index) => {
                                return (
                                    <option value={val} key={index}>
                                        {val}
                                    </option>
                                )
                            })
                        }

                    </select>
                </td>
            </tr>
            )
        })
    const handleBuy = async (orderID) => {
        const mail_name = await getUser(user)
        const res = await buyTicket(token, {
            date: Date.now(),
            eventId: data._id,
            eventTitle: data.title,
            to: user,
            name: `${mail_name[0].f_name} ${mail_name[0].l_name}`,
            count: count,
            orderId: orderID
        })
        if(res.result === 'success') {
            toast.success('Successfully bought')
            setShow(false)
            const rest = data.seat_ticket_sale_count.map((val, index) => val - count[index] )
            const tx = await updateEventCount(token, data._id, {
                sale_seat: rest
            })
            if(tx.result === 'success') {
                navigate(`/receipt/${res.id}`)
            } else {
                toast.warning('Something went wrong.')
            }
        } else {
            toast.warning('Something went wrong.')
        }
    }

    const [show, setShow] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [totalMoney, setTotalMoney] = useState(0)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(success) {
            handleBuy(orderID)
        }
    }, [success])

    useEffect(() => {
        var sum = 0
        count.map((val, index) => {
            sum += val * data.seat_price[index]
        })
        setTotalMoney(sum)
    }, [count])

    return (
        <>
            <div 
                className={`${styles.seat_plan}`}
                style={{
                    backgroundImage: `url(${data.seatplan_url})`
                }}
            >
            </div>
            <div className={`${styles.ticket_section}`}>
                <table className={`w-100 ${styles.table}`}>
                <thead>
                    <tr>
                    <th className={styles.th}> Section </th>
                    <th className={styles.th}> Price </th>
                    <th className={styles.th}> Quantity </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        drawTable()
                    }
                </tbody>
                </table>
                <div
                    className={`${styles.buy_ticket_button} w-100`}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                    }}
                >
                    {
                        show ? 
                            // <PaypalButton
                            //     amount={`${totalMoney}`}
                            //     currency={data.currency}
                            //     setOrderID={setOrderID}
                            //     setSuccess={setSuccess}
                            //     receiver={data.paypal_email}
                            // />
                            <PayPalCusBtn
                                amount={`${totalMoney}`}
                                currency={data.currency}
                                setOrderID={setOrderID}
                                setSuccess={setSuccess}
                                receiver={data.paypal_email}
                            />  
                        : 
                            <></>
                    }
                    {
                        soldOut === true ?
                        <div
                            className={`${styles.buy_ticket} btn btn-normal`}
                        >
                            SOLD OUT
                        </div>
                            :
                        <Button
                            className={`${styles.buy_ticket} btn btn-normal`}
                            content="BUY TICKET(S)"
                            onClick={() => { 
                                if(token) {
                                    setShow(true)
                                } else if(role === 'admin') {
                                    toast.warning('Please login with User account')
                                } else {
                                    toast.warning('Please login.')
                                    navigate('/signin')
                                }
                            } }
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default User