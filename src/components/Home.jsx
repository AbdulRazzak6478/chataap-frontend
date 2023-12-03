import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";  
import Header from './Header';
// const chatId = JSON.parse(localStorage.getItem("chatAppUserId")) ;
// toast.success(`chat id is : ${chatId}`)
// const name = Cookies.get('jwt_token');
// let token = Cookies.get("jwt_token");
const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { id }= useParams();
  console.log("id ",id);
  let token = Cookies.get("jwt_token");
  return (
    <>
      { !token ? (
        <Navigate to="/signin" replace={true} />
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header />
          <h1>Hello world</h1>
        </>
      )}
    </>
  )
}

export default Home 