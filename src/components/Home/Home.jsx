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
  const [isUsers, setIsUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState()
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
  // let arr = [];
  function onFormData(event)
  {
    if(event.target.checked)
    {
      setIsUsers([...isUsers,event.target.id]);
      console.log('user selected :' ,event.target.checked);
      console.log('user name: ',event.target.id);
    }
    else{
      console.log('in false ',event.target.id, event.target.checked)
      // arr = arr.filter((element)=>{
      //   return event.target.id !=element
      // });
      setIsUsers([...isUsers.filter(ele=>event.target.id!=ele)])
    }
    console.log('array : ',isUsers)
    isUsers.forEach((ele)=>console.log(ele))
  }
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
              <div className="grp-box">
                <div className="field">
                  <div >Email* </div>
                  <input type="text" id="email"  placeholder='Enter Your Email ...' required />
                  <div className={`error`}>Email* is required.</div>
                </div>
                <div className="field">
                  <div >members* </div>
                  <input type="text" id="users" value={`${isUsers.map((element,index)=>element)}`}   placeholder='select the users to add into group ...' required />
                  <div className={`error`}>No Users* has been added</div>
                </div>
                {/* <div className="names">
                  {isUsers.map((element,index)=>{
                    return <span key={index}>{element}</span>
                  })}
                </div> */} 
                <div className="create-grp-btns">
                  <button className='cancel'>Cancel</button>
                  <button className='create'>Create Group</button>
                </div>
                <div className="list">
                  <ul>
                    <li> <input type="checkbox" name="check" className="click"  onClick={onFormData}  id="user1"/> <span>User1</span></li>
                    <li> <input type="checkbox"  name="check" className="click" onClick={onFormData}  id="user2"/> <span>User2</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={onFormData}  id="user3"/> <span>User3</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={onFormData}  id="user4"/> <span>User4</span></li>
                    <li> <input type="radio"  name="check"  className="click" onClick={onFormData} id="user5"/> <span>User5</span></li>
                  </ul> 
                </div>
              </div>
              <div className="user-box">
                <div className="field">
                  <div >members* </div>
                  <input type="text" id="users" value={`${selectedUser}`}   placeholder='select the user to start the chat ...' required />
                  <div className={`error`}>No User* has been selected</div>
                </div>
                <div className="list">
                  <ul>
                    <li> <input type="radio" name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}   id="user1"/> <span>User1</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user2"/> <span>User2</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user3"/> <span>User3</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user4"/> <span>User4</span></li>
                    <li> <input type="radio"  name="check"  className="click" onClick={(e)=>setSelectedUser(e.target.id)} id="user5"/> <span>User5</span></li>
                  </ul> 
                </div>
                <div className="create-grp-btns">
                  <button className='cancel'>Cancel</button>
                  <button className='create'>Start Chat</button>
                </div>
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