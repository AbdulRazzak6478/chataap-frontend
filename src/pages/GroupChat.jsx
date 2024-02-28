import React, { useState } from "react";
import Header from "../components/Home/Header";
import { MdGroupAdd, MdPersonAddAlt1 } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCircleArrowRight } from "react-icons/fa6";
import TypingBox from "../components/Chats/TypingBox";
import { useEffect } from "react";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import axios from "axios";
let socket;
let ENDPOINT = "http://localhost:3005/";
const GroupChat = () => {
  const { userid, groupid } = useParams();
  console.log("data", userid, groupid);
  const [chatData, setChatData] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [userGroup, setUserGroup] = useState([]);
  let chatFlagedr;
  const userDetails = async () =>{
    const user = await axios.get(`http://localhost:3005/users/${userid}`);
    console.log('user details : ',user.data);
    console.log('user details id : ',user.data.data._id);
    setIdUser(user.data);
  } 
  const userGrpDetails = async () =>{
    const group = await axios.get(`http://localhost:3005/groups/${groupid}`);
    console.log('user group details : ',group.data);
    console.log('user details id : ',group.data.data._id);
    setUserGroup(group?.data?.data);
  } 
  const userGroupChatMessages = async () =>{
    const user = await axios.get(`http://localhost:3005/groups/${groupid}/chats`);
    console.log('user group messages details : ',user);
    setChatData([...user?.data?.data]);
  } 
  useEffect(() => {
    userDetails();
    userGrpDetails();
    userGroupChatMessages();
  }, [ ]) 
  
  function onSendMessageData() {
    let sendBtn = document.querySelector("#typed-msg").value;
    console.log("typed message : ", sendBtn);
    if(sendBtn.length == 0 )
    {
      return;
    }

    socket.emit("user-message", { userName:idUser.data.name , userId:userid , chatId: groupid, message: sendBtn, isGroup : true });
    document.querySelector("#typed-msg").value = "";
    console.log("messages : ", chatData);
  }


  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("joined", { groupid });

    socket.on("userJoined", (data) => {
      console.log('user joined',data);
    });

    socket.on("welcome", (data) => {
      console.log("data from  server ", data);
    });

    socket.on("message-received", (data) => {
      console.log("chat message object received from server : ", data);
      setChatData([...chatData, data]);
    });
    return () => {
      //   socket.emit('disconnect')
      socket.off();
    };
  }, [socket]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="group-chat-box">
          <div className="group-header">
            <div className="grp-head">
              <MdGroupAdd />
              <span>{userGroup.name}</span>
            </div>
            <div className="grp-profile">
              <FaCircleArrowRight />
            </div>
          </div>
          <div className="chats-container">
            {
                chatData.length == 0 && <h1>No Messages in This Chat.</h1>
            }
            {chatData.length != 0 &&
              chatData.map((chat, index) => {
                const date = new Date(chat.createdAt);
                const am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
                console.log('date : ',date)
                if (chat.userId == userid) {
                  return (
                    <div className="my" key={index}>
                      <div className="wrapper mywrapper">
                        <div className="my-name">You</div>
                        <div className="message">
                          <span>{chat.message}</span>
                          <span className="timestamp">{`${date.getHours() >12 ? date.getHours() -12 :date.getHours()} : ${date.getMinutes()} ${am_pm}`}</span>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="other" key={index}>
                      <div className="wrapper otherwrapper">
                        <div className="other-name">{chat.userName}</div>
                        <div className="message">
                          <span>{chat.message}</span>
                          <span className="timestamp">{`${date.getHours() >12 ? date.getHours() -12 :date.getHours()} : ${date.getMinutes()} ${am_pm}`}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="typing-box">
          <input type="text" id="typed-msg" placeholder="Start Typing ..." />
          <div className="send-icon" onClick={onSendMessageData}>
            <IoSend />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChat ;
