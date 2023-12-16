import React, { useState } from "react";
import Header from "../components/Home/Header";
import { MdGroupAdd } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCircleArrowRight } from "react-icons/fa6";
import TypingBox from "../components/Chats/TypingBox";
import { useEffect } from "react";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
// import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import socketIO from 'socket.io-client';
let socket;
const PersonalChat = () => {
  const { userid, chatUserId } = useParams();
  console.log("data", userid, groupid);
  
  return (
    <>
      <Header />
      <div className="container">
        <div className="group-chat-box">
          <div className="group-header">
            <div className="grp-head">
              <MdGroupAdd />
              <span>Qureshi</span>
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
                  <span className="timestamp ">11:50PM</span>
                </div>
              </div>
            </div>
            <div className="my">
              <div className="wrapper mywrapper">
                <div className="my-name">you</div>
                <div className="message">
                  <span>How are you ? , everything is ok</span>
                  <span className="timestamp">11:50PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="typing-box">
          <input
            type="text"
            className="typed-msg"
            placeholder="Start Typing ..."
          />
          <div className="send-icon">
            <IoSend />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalChat;