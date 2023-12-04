import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";  
import Header from './Header';
import { useEffect } from 'react';
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import InputBox from './InputBox';
// const chatId = JSON.parse(localStorage.getItem("chatAppUserId")) ;
// toast.success(`chat id is : ${chatId}`)
// const name = Cookies.get('jwt_token');
// let token = Cookies.get("jwt_token");
const Home = () => {
  const [isToken, setIsToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id }= useParams();
  // console.log("id ",id);
  let token = Cookies.get("jwt_token");
  const obj ={
    _id:'1234567890',
    '_id':'0987654321',
    id:'asdfghjkl',
  }
  // console.log("1",obj.id);
  // console.log("2",obj._id);
  // console.log("3",obj['_id']);
  return (
    <>
      { !token ? (
        <Navigate to="/signin" replace={true} />
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header />
          <div className="btns">
            <div className="add-group-btn button">
              <MdGroupAdd />
              <span>Add Group</span>
              </div>
            <div className="add-user-btn button"> 
              <MdPersonAddAlt1 />
              <span>Add User</span>
            </div>
          </div>
          <div className="input-container">
              <div className="box ">
                Hello world
              </div>
          </div>    
          <div className="list-container">
            <div className="group-list">group1</div>
            <div className="user-list">user1</div>
          </div>
        </>
      )}
    </>
  )
}

export default Home 