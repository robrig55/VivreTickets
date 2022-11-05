import React, { useState, useEffect } from 'react'

import { Editor as RichEditor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertFromHTML, convertToRaw, ContentState } from "draft-js";
import draftToHtml from 'draftjs-to-html';

import styles from './index.module.css'
import Input from '../utils/basic/input'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = (props) => {

    const [title, setTitle] = useState(props.data.title)
    const [area, setArea] = useState(props.data.area)
    const [description, setDescription] = useState(props.data.description)
    const [status, setStatus] = useState(props.data.status)

    const html_content = props.data.content ? props.data.content : ''

    const blocksFromHTML = convertFromHTML(html_content);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    const raw = convertToRaw(content);
    const [contentState, setContentState] = useState(raw);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (contentState) => {
      setEditorState(contentState);
    };

    return (
        <div className={styles.edit} style={{overflow: 'scroll'}}>
            <Input 
                className='input mt-20 w-100'
                type="text"
                placeholder="TITLE"
                id="edit_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input 
                className='input mt-20 w-100'
                type="text"
                placeholder="AREA"
                id="edit_area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />
            <Input 
                className='input mt-20 w-100'
                type="text"
                placeholder="DESCRIPTION"
                id="edit_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className='mt-20 w-100' style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <span style={{color: 'black'}}> Status: </span>
                <input 
                    type="radio" 
                    id="status_enable" 
                    name="status" 
                    value='enable' 
                    defaultChecked={status} 
                    onClick={() => { setStatus(true) }}
                />
                <label htmlFor='status_enable' style={{color: 'black'}}> Enable </label>
                <input 
                    type="radio" 
                    id="status_disable" 
                    name="status" 
                    value='disable'
                    defaultChecked={!status} 
                    onClick={() => { setStatus(false) }}
                />
                <label htmlFor='status_disable' style={{color: 'black'}}> Disable </label>
            </div>

            <div 
                style={{ 
                    border: "1px solid black", 
                    padding: '10px', 
                    minHeight: '400px' 
                }}
                className='mt-20 input'
            >
                <RichEditor
                    defaultContentState={contentState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    placeholder="Input Description"
                />
            </div>

            <div className={`${styles.buttons} mt-20`}>
                <div 
                    className='btn btn-red mr-10'
                    style={{cursor: 'pointer'}}
                    onClick={
                        () => {
                            props.onSave({
                                _id: props.data._id,
                                title: title,
                                area: area,
                                status: status,
                                description: description,
                                content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                                last_update: Date.now()
                            })
                        }
                    }
                > Save Changes </div>
                <div 
                    className='btn btn-blank ml-10'
                    style={{cursor: 'pointer'}}
                    onClick={props.onCancel}
                > Cancel </div>
            </div>
        </div>
    )
}

export default Editor