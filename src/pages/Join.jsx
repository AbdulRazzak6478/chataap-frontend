import Cookies from 'js-cookie';
import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const Join = () => {
    // id = 656b8142a17e2d9ee95fec92
    let chatUserId = JSON.parse(localStorage.getItem("chatAppUserId"));
    console.log('chat user id is : ',chatUserId);
    let token = Cookies.get("jwt_token"); 
    let isTokenPresent = null ;
    if(!chatUserId){
        isTokenPresent = Cookies.remove("jwt_token");
        const userId = localStorage.removeItem("chatAppUserId") ;
        console.log('user id : ',userId)
        console.log('after removing the token from cookies : ',isTokenPresent);
    }
  return (
    <>
        
        {
            !chatUserId ? (
                <Navigate to={`/signin`} replace={true} />
            ):(
                <>
                    <h1>Join the ChatApp Community</h1>
                </>
            )
           
        }
    </>
  )
}

export default Join