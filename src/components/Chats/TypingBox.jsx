import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoSend } from "react-icons/io5";
const TypingBox = () => {
    const [message, setMessage] = useState('');
    console.log('message : ',message);
    function onSendMesssage(){
        setMessage('');
        // alert('message : ',message+'is send');
        toast.success(message);
    }
  return (
    <>
        <div className="typing-box">
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='' placeholder='Start Typing ...' />
                <div className="send-icon">
                    <IoSend onClick={onSendMesssage}/>
                </div>
        </div>
    </>
  )
}

export default TypingBox