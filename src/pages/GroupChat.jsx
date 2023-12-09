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
    const [message, setMessage] = useState('');
    console.log('message : ',message);
    let item = `<li className="hello">text</li>`;
    function onSendMesssage(){
        // <div className="my">
        //     <div className="wrapper mywrapper">
        //         <div className="my-name">you</div>
        //         <div className="message">
        //             <span>How are you ? , everything is ok</span> 
        //             <span className='timestamp'>11:50PM</span>
        //         </div>
        //     </div>
        // </div>
        if(message.length==0)
        {
            return;
        }
        const container = document.querySelector('.chats-container')
        const my = document.createElement('div');
        const wrapper = document.createElement('div');
        const you = document.createElement('div');
        const messageElement = document.createElement('div');
        const contentElement = document.createElement('span');
        const timeStampElement = document.createElement('span');

        my.classList.add('my');
        wrapper.classList.add('wrapper');
        wrapper.classList.add('mywrapper');
        you.classList.add('my-name');
        messageElement.classList.add('message');
        timeStampElement.classList.add('timestamp');
        const d1 = new Date();
        timeStampElement.textContent = d1.getHours()+':'+d1.getMinutes();
        contentElement.textContent = message;
        you.textContent = 'You';

        messageElement.appendChild(contentElement);
        messageElement.appendChild(timeStampElement);

        wrapper.appendChild(you);
        wrapper.appendChild(messageElement);

        my.appendChild(wrapper);

        container.appendChild(my)

        toast.success(message);
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
                                <span className='timestamp '>11:50PM</span>
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