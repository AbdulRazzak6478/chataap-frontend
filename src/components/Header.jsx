import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  let chatUserId = JSON.parse(localStorage.getItem("chatAppUserId"));
  return (
    <>
      {chatUserId && (
        <div className="header">
          <div className="logo">Logo</div>
          <div className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
