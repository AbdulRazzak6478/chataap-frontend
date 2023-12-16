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
const GroupChat = () => {
  const { userid, groupid } = useParams();
  console.log("data", userid, groupid);
  const [message, setMessage] = useState("");

  useEffect(() => {

    socket = socketIO("http://localhost:3005/", {
      transports: ["websocket"],
    });
    socket.emit('client','message from client');

    socket.emit('joined','mohammed');
    socket.on('welcome',(data)=>{
      alert(data.user, data.message)
    })
    socket.emit("join_room", {
      groupid: groupid,
    });
    socket.on('leave',(args)=>{
      console.log('user leaves')
    })
  
    return () => {
      // socket.emit('disconnect')
      socket.off();
    }
  }, [])
  
  // const container = document.querySelector(".chats-container");
  // const my = document.createElement("div");
  // const wrapper = document.createElement("div");
  // const you = document.createElement("div");
  // const messageElement = document.createElement("div");
  // const contentElement = document.createElement("span");  
  // const timeStampElement = document.createElement("span");
//   function onSendMesssage() {
//       // toast.success(message);
//           let d1 = new Date();
//           socket.emit("chat", {
//             groupid: groupid,
//             userid: userid,
//             message: mymessage,
//             date: d1.getHours() + ":" + d1.getMinutes(),
//             name: "you",
//           });
//     }
//     let mymessage = '';
//     // const btns = document.querySelector(`.send-icon`);
//     // console.log('btn ',btns)
//     // btns.addEventListener('click',()=>{
//     //     // console.log('message : ',mymessage)
//     // })
// // setMessage('')
//     socket.on("msg_rcvd", (args) => {
//     console.log("data : ", args);
//     toast.success(args.message);
//     }); 
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

export default GroupChat;