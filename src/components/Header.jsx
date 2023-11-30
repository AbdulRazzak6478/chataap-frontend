import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <>
        <div className="header">
          <div className="logo">Logo</div>
          <div className="nav">
            <ul>
              <li>
                <Link to="/" >Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </>
  )
}

export default Header