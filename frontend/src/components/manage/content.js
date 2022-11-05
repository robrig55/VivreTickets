import React, { useState, useEffect, useContext } from 'react';

import { ImEye } from 'react-icons/im'
import { AiTwotoneEdit } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'

import moment from 'moment'

import Editor from './editor';

import styles from './index.module.css';
import { addContent, deleteContent, getContents, updateContent } from '../apis';

import { UserContext } from '../provider/UserProvider';
import { toast } from 'react-toastify';
import LoadingScreen from '../utils/loadingScreen';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Content = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
   
    const { token } = useContext(UserContext)

    const [open, setOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')

    async function preLoading() {
        const data = await getContents()
        setData(data)            
        setLoading(false)
    }

    useEffect(() => {
        preLoading()
    }, [])

    const [showEditor, setShowEditor] = useState(-1)

    const drawBody = () => 
        data.map((val, index) => {
            return (
                <tr key={index}>
                    <td className={`${styles.td}`}> {val.title} </td> 
                    <td className={`${styles.td}`}> {val.area} </td> 
                    <td className={`${styles.td}`}>
                        {
                            val.status === true ?
                                <div className={`${ styles.mark_enable }`}>
                                    Enabled
                                </div> :
                                <div className={`${ styles.mark_disable }`}>
                                    Disabled
                                </div>
                        }
                    </td> 
                    <td className={`${styles.td}`}>
                        {
                            moment(val.last_update).format('YYYY-MM-DD hh:mm')
                        }
                    </td>
                    <td 
                        className={`${styles.td}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <ImEye size={15} color='red' />
                            <div 
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={ () => {
                                    setModalContent(val.content)
                                    setOpen(true)
                                } }
                            >
                                View
                            </div>
                        </div>
                        &nbsp;&nbsp;
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <AiTwotoneEdit size={15} color='red' />
                            <div 
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={ () => { setShowEditor(index) } }                                
                            >
                                Edit
                            </div>
                        </div>
                        {
                            data[index]._id !== 'new' ?
                            <>&nbsp;&nbsp;                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <FaTrashAlt size={15} color='red' />
                                <div 
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={ async () => { 
                                        setLoading(true)
                                        await deleteContent(token, data[index]._id) 
                                        preLoading()
                                        setShowEditor(-1)
                                    }}
                                >
                                    Delete
                                </div>
                            </div>
                            </>
                            :
                            <></>
                        }

                    </td>
                </tr>
            )
        })
    
    const handleSave = async (data) => {
        const req = {
            title: data.title,
            area: data.area,
            status: data.status,
            description: data.description,
            content: data.content,
            last_update: data.last_update
        }
        setLoading(true)

        let response;
        if(data._id === 'new') {
            response = await addContent(token, req)
        } else {
            response = await updateContent(token, data._id, req)
        }
        if(response.result === 'success') {
            toast.success('Successfully added')
        } else {
            toast.error('Something went wrong. Please try again')
        }
        preLoading()
        setShowEditor(-1)
    }

    return (
        <div className={`${styles.content} w-100`}>
            {
                loading ? 
                   <LoadingScreen /> 
                :
                <>
                    <Modal 
                        open={open} 
                        onClose={() => { setOpen(false) }} 
                        center
                    >
                        <div
                            style={{
                                marginTop: '30px'
                            }}
                            dangerouslySetInnerHTML={{ __html: modalContent}}
                        >
                        </div>
                    </Modal>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <div 
                            style={{
                                color: 'black',
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                            onClick={() =>{
                                const newrow = {
                                    _id: 'new',
                                    title: 'NEW',
                                    area: 'NEW',
                                    status: false,
                                    description: 'NEW',
                                    last_update: Date.now(),
                                    content: 'NEW'
                                }
                                setData([...data, newrow])
                            }}
                        >
                            ADD
                        </div>
                    </div>
                    <div style={{overflow: 'auto'}}>
                        <table className={`${styles.table} w-100`}>
                            <thead>
                                <tr>
                                    <th className={`${styles.th}`}> TITLE </th>
                                    <th className={`${styles.th}`}> AREA </th>
                                    <th className={`${styles.th}`}> STATUS </th>
                                    <th className={`${styles.th}`}> LAST UPDATE </th>
                                    <th className={`${styles.th}`}>  </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    drawBody()
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        showEditor >= 0 && 
                        <Editor 
                            data = {data[showEditor]}
                            onSave={handleSave}
                            onCancel={() => {
                                setShowEditor(-1)
                            }}
                        />
                    }
                    </>
            }
        </div>
    )
}

export default Content;