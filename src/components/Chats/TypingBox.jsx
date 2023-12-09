import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoSend } from "react-icons/io5";
const TypingBox = ({setTypeMessage,msgRender}) => {
    const [message, setMessage] = useState('');
    console.log('message : ',message);
    function onSendMesssage(){
        // alert('message : ',message+'is send');
        toast.success(message);
        setTypeMessage(message);
        msgRender()
        setMessage('');
    }
  return (
    <>
        <div className="typing-box">
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='' placeholder='Start Typing ...' />
                <div className="send-icon" onClick={onSendMesssage}>
                    <IoSend />
                </div>
        </div>
    </>
  )
}

export default TypingBox