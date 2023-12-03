import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { Link} from 'react-router-dom';
import Cookies from 'js-cookie';
const Navbar = () => {
    const [showNavList,setShowNavList] = useState(false);
    // const [IsLogout, setIsLogout] = useState(false);
    function toggleNavList(){
        console.log('click');
        setShowNavList(!showNavList);
    }
    let chatUserId = JSON.parse(localStorage.getItem("chatAppUserId"));
    console.log('before logout : ',chatUserId)
    function logoutUser(){
        console.log('in logout function')
        chatUserId = localStorage.removeItem("chatAppUserId")
        let token = null;
        let token2 = null;
        if(!chatUserId)
        {
            token2 = Cookies.get("jwt_token");
            token = Cookies.remove('jwt_token') // removed!
        }
        // location.reload();
        // setIsLogout(true);
        console.log('logout user',chatUserId, token, token2); 
    }
  return (
    <>
    {
        // IsLogout ?  (<Navigate to={`/signin`} replace={true} />):
        (
            <nav className='nav'>
                <ul className='nav-list' style={{ display: showNavList ? "flex" : null }}>
                    <li className='nav-list-item'>
                        <Link to={`/${chatUserId}`} className='link nav-link'>Home</Link>
                    </li>
                    
                    <li className='nav-list-item'>
                        <Link to='/signin'>
                            <button className='btn'onClick={logoutUser} >Logout</button>
                        </Link>
                    </li>
                    {/* <li className='nav-list-item'>
                        <Link to="/signin">
                            <button className='btn'>LogIn </button>
                        </Link>
                    </li> */}
                </ul>
                <button
                    type="button"
                    onClick={toggleNavList}
                    className="menu btn--icon nav__hamburger"
                    aria-label="toggle navigation"
                >
                    { showNavList ? <CgClose /> : <FiMenu />}
                </button>
            </nav>
        )
    }
    </>
  )
}

export default Navbar