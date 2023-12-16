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
let socket;
let ENDPOINT = "http://localhost:3005/";
const PersonalChat = () => {
  const { userid, chatUserId } = useParams();
  console.log("data", userid, chatUserId);
  const [chatData, setChatData] = useState([]);
  let chatFlag;

  function onSendMessageData() {
    let sendBtn = document.querySelector("#typed-msg").value;
    console.log("typed message : ", sendBtn);

    socket.emit("user-message", { userid, chatUserId, message: sendBtn });
    document.querySelector("#typed-msg").value = "";
    console.log("messages : ", chatData);
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("joined", { chatUserId });

    socket.on("userJoined ", (data) => {
      console.log(data.message);
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
              <MdPersonAddAlt1 />
              <span>Qureshi</span>
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
                if (chat.userid == userid) {
                  return (
                    <div className="my" key={index}>
                      <div className="wrapper mywrapper">
                        <div className="my-name">You</div>
                        <div className="message">
                          <span>{chat.message}</span>
                          <span className="timestamp">11:50PM</span>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="other" key={index}>
                      <div className="wrapper otherwrapper">
                        <div className="other-name">{chat.userid}</div>
                        <div className="message">
                          <span>{chat.message}</span>
                          <span className="timestamp ">11:50PM</span>
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

export default PersonalChat;
