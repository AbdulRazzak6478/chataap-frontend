import React from 'react'
import Header from '../components/Home/Header'
import { MdGroupAdd } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { FaCircleArrowRight } from "react-icons/fa6";

const GroupChat = () => {
  return (
    <>
        <Header />
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
                messages
                <div className="message-box">
                    Typing
                </div>
            </div>
        </div>
    </>
  )
}

export default GroupChat