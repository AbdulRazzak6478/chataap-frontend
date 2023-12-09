import React, { useState } from 'react'
import Header from '../components/Home/Header'
import { MdGroupAdd } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { FaCircleArrowRight } from "react-icons/fa6";
import TypingBox from '../components/Chats/TypingBox';
import { useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import toast from 'react-hot-toast';

const GroupChat = () => {
    const [typeMessage, setTypeMessage] = useState('');
    const [message, setMessage] = useState('');
    console.log('message : ',message);
    function onSendMesssage(){
        toast.success(message);
        console.log('function is called');
        const ul = document.getElementById('msgs');
        const liItem= `<li>${message}</li>`
        const li = document.createElement('li');
        li.textContent = message;
        ul.appendChild(li);
        setMessage('')
    }
  return (
    <>
        <Header />
        <div className="container">
            <div className="group-chat-box">
                <div className="group-header">
                    <div className="grp-head">
                        <MdGroupAdd />
                        <span>Chaddy Buddies</span>
                    </div>
                    <div className="grp-profile">
                        <FaCircleArrowRight />
                    </div>
                </div>
                <div className="chats-container">
                    <div className="other">
                        <div className="wrapper otherwrapper">
                            <div className="other-name">Shoeb</div>
                            <div className="message">
                                <span>How are you ? , everything is ok</span> 
                                <span className='timestamp'>11:50PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="my">
                        <div className="wrapper mywrapper">
                            <div className="my-name">you</div>
                            <div className="message">
                                <span>How are you ? , everything is ok</span> 
                                <span className='timestamp'>11:50PM</span>
                            </div>
                        </div>
                    </div>
                    <ul id="msgs">
                        <li id="msg">hello how are you ? </li>
                    </ul>
                </div>
            </div>
            <div className="typing-box">
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='' placeholder='Start Typing ...' />
                <div className="send-icon" onClick={onSendMesssage}>
                    <IoSend />
                </div>
            </div>
        </div>
    </>
  )
}

export default GroupChat