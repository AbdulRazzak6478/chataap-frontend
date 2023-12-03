import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = () => {
  let chatUserId = JSON.parse(localStorage.getItem("chatAppUserId"));
  return (
    <>
      {chatUserId && (
        <div>
        <header className='header '>
          <h3>
            <a href="#home" className="logo">
            Abdul Razzak
            </a>
          </h3>
          <Navbar />
        </header>
      </div>
      )}
    </>
  );
};

export default Header;
