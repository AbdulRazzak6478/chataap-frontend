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
  const { userid, chatUserId } = useParams();
  console.log("data", userid, chatUserId);
  const [chatData, setChatData] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [userNm, setUserName] = useState();
  let chatFlagedr;

  const userDetails = async () =>{
    const user = await axios.get(`http://localhost:3005/users/${userid}`);
    console.log('user details : ',user);
    console.log('user details id : ',user.data.data._id);

    const group = await axios.get(`http://localhost:3005/chats/${chatUserId}`);
    console.log('user private group details : ',group);
    console.log('user private details id : ',group?.data?.data.userNames[0]);

    if(group?.data?.data.userNames[0] == user.data.data.name)
    {
      setUserName(group?.data?.data.userNames[1])
    }
    else {
      setUserName(group?.data?.data.userNames[0]);
    }
    setIdUser(user.data);
  } 

  const userGroupChatMessages = async () =>{
    console.log('chat messages');
    const chat = await axios.get(`http://localhost:3005/chats/${chatUserId}/chat`);
    console.log('user private group chats messages details : ',chat);
    setChatData([...chat?.data?.data]);
  } 
  useEffect(() => {
    userDetails();
    userGroupChatMessages();
  }, [ ]) 
  
  function onSendMessageData() {
    let sendBtn = document.querySelector("#typed-msg").value;
    console.log("typed message : ", sendBtn);
    if(sendBtn.length == 0 )
    {
      return;
    }

    socket.emit("user-message", { userName:idUser.data.name , userId:userid , chatId: chatUserId, message: sendBtn, isGroup : false });
    document.querySelector("#typed-msg").value = "";
    console.log("messages : ", chatData);
  }


  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("joined", { groupid:chatUserId });

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
              <MdPersonAddAlt1 />
              <span>{userNm}</span>
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








// import React, { useState } from "react";
// import Header from "../components/Home/Header";
// import { MdGroupAdd, MdPersonAddAlt1 } from "react-icons/md";
// import { SlOptionsVertical } from "react-icons/sl";
// import { FaCircleArrowRight } from "react-icons/fa6";
// import TypingBox from "../components/Chats/TypingBox";
// import { useEffect } from "react";
// import { IoSend } from "react-icons/io5";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import socketIO from "socket.io-client";
// let socket;
// let ENDPOINT = "http://localhost:3005/";
// const PersonalChat = () => {
//   const { userid, groupid } = useParams();
//   console.log("data", userid, groupid);
//   const [chatData, setChatData] = useState([]);
//   let chatFlag;

//   function onSendMessageData() {
//     let sendBtn = document.querySelector("#typed-msg").value;
//     console.log("typed message : ", sendBtn);

//     socket.emit("user-message", { userid, groupid, message: sendBtn });
//     document.querySelector("#typed-msg").value = "";
//     console.log("messages : ", chatData);
//   }

//   useEffect(() => {
//     socket = socketIO(ENDPOINT, { transports: ["websocket"] });
//     socket.on("connect", () => {
//       console.log("connected");
//     });
//     socket.emit("joined", { groupid });

//     socket.on("userJoined ", (data) => {
//       console.log('user joined',data);
//     });

//     socket.on("welcome", (data) => {
//       console.log("data from  server ", data);
//     });

//     socket.on("message-received", (data) => {
//       console.log("chat message object received from server : ", data);
//       setChatData([...chatData, data]);
//     });
//     return () => {
//       //   socket.emit('disconnect')
//       socket.off();
//     };
//   }, [socket]);
//   return (
//     <>
//       <Header />
//       <div className="container">
//         <div className="group-chat-box">
//           <div className="group-header">
//             <div className="grp-head">
//               <MdPersonAddAlt1 />
//               <span>Qureshi</span>
//             </div>
//             <div className="grp-profile">
//               <FaCircleArrowRight />
//             </div>
//           </div>
//           <div className="chats-container">
//             {
//                 chatData.length == 0 && <h1>No Messages in This Chat.</h1>
//             }
//             {chatData.length != 0 &&
//               chatData.map((chat, index) => {
//                 if (chat.userid == userid) {
//                   return (
//                     <div className="my" key={index}>
//                       <div className="wrapper mywrapper">
//                         <div className="my-name">You</div>
//                         <div className="message">
//                           <span>{chat.message}</span>
//                           <span className="timestamp">11:50PM</span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div className="other" key={index}>
//                       <div className="wrapper otherwrapper">
//                         <div className="other-name">{chat.userid}</div>
//                         <div className="message">
//                           <span>{chat.message}</span>
//                           <span className="timestamp ">11:50PM</span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//           </div>
//         </div>
//         <div className="typing-box">
//           <input type="text" id="typed-msg" placeholder="Start Typing ..." />
//           <div className="send-icon" onClick={onSendMessageData}>
//             <IoSend />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PersonalChat;
