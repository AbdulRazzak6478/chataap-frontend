import React from 'react'
import { useParams } from 'react-router-dom'
import Cookies from "js-cookie";  

const Home = () => {
  const { id }= useParams();
  console.log("id ",id);
  return (
    <div>Home</div>
  )
}

export default Home 