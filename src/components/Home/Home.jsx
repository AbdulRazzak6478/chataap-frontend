import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";  
import Header from './Header';
import { useEffect } from 'react';
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
// import InputBox from './InputBox';
import axios from 'axios';
import toast from 'react-hot-toast';
// const chatId = JSON.parse(localStorage.getItem("chatAppUserId")) ;
// toast.success(`chat id is : ${chatId}`)
// const name = Cookies.get('jwt_token');
// let token = Cookies.get("jwt_token");
const Home = () => {
  const [formData, setFormData] = useState({
    name : '',
    users: [],
  })
  const [fetchUsers, setFetchUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [submitClick,setSubmitClick]=useState(false);
  const [addUser,setAddUser] = useState('');
  const [isModel,setIsModel] = useState(false);
  const [groupModel,setGroupModel] = useState(false);
  const [userModel,setUserModel] = useState(false);
  const [name, setName] = useState('')
  const [isUsers, setIsUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [options, setOptions] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const { id }= useParams();

  useEffect(() => {
    try {
      (async()=>{
        const chatUsers = await axios("http://localhost:3005/users");
        setFetchUsers(chatUsers.data.data);
      })()
    } catch (error) {
      console.log('error while fetching users');
    }
  }, [])
  

  async function gettingUsers()
  {
    const user = await axios(`http://localhost:3005/users/${id}`);
    setCurrentUser(user.data?.data);

    // const chatUsers = await axios("http://localhost:3005/users");
    // setFetchUsers(chatUsers.data.data);

    const customConfig = {
      headers: {
          "Content-Type": "application/json",
      },
    };

    const createGroupPayload = {
      ids : user.data?.data.groups,
    };
    const fetchGroups = await axios.post('http://localhost:3005/groups/ids',createGroupPayload,customConfig);
    console.log('user groups details: ',fetchGroups);
    setUserGroups(fetchGroups?.data?.data);

    const friendsIds = {
      ids :user.data?.data.friends,
    }
    const fetchFriends = await axios.post('http://localhost:3005/chats/friends',friendsIds,customConfig);
    console.log(' user fetch friends details : ',fetchFriends);
    setUserChats(fetchFriends.data.data);

  }

  // fetching users when home page loaded
  useEffect(function(){
    const groupData = gettingUsers();
  }, []) ;
 

  let token = Cookies.get("jwt_token");

  function onCancelModel()
  {
    console.log('on cancel name : ',name)
    setIsModel(false);
    setIsUsers([]);
    setName('');
  }

  async function onCreateUser(){
    const customConfig = {
      headers: {
          "Content-Type": "application/json",
      },
    };
    setSubmitClick(true);
    if(selectedUser.length == 0)
    {
      return;
    }
    let usersIds = '';
    usersIds+=JSON.parse(localStorage.getItem("chatAppUserId"))+',';
    fetchUsers.forEach((user)=>{
      if(user.name == selectedUser){
        usersIds+=user._id;
      }
    });
    const names = [currentUser.name,selectedUser];
    const createUserPayload = { 
      users : usersIds,
      userNames : names,
    };
    console.log('create group payload is : ',createUserPayload);
    const createdUser = await axios.post('http://localhost:3005/chats',createUserPayload,customConfig);
    setUserChats((prevState)=>[...prevState,createdUser?.data.data]);
    console.log('group created : ',createdUser);
    setIsModel(false);
    toast.success('User created successfully !.')
  }

  async function onCreateGroup()
  {
    const customConfig = {
      headers: {
          "Content-Type": "application/json",
      },
    };
    setSubmitClick(true);
    if(name.length == 0 || isUsers.length == 0)
    {
      return;
    }
    let usersIds = '';
    usersIds+=JSON.parse(localStorage.getItem("chatAppUserId"))+',';
    // getting ids of selected users to add in group users
    fetchUsers.forEach((user)=>{
      isUsers.forEach((name,index)=>{
        if(name==user.name){
          if(isUsers.length-1==index)
          {
            usersIds+=user['_id'];
          }
          else{
            usersIds+=user['_id']+',';
          }
        }
      })
    });
    console.log('users ids of the selected users : ',usersIds);
    const createGroupPayload = {
      name : name,
      isPersonal : 0,
      admin : JSON.parse(localStorage.getItem("chatAppUserId")), 
      users : usersIds,
    };
    console.log('create group payload is : ',createGroupPayload);
    const createdGroup = await axios.post('http://localhost:3005/groups',createGroupPayload,customConfig);
    console.log('group created : ',createdGroup);

    setName('');
    setIsUsers([]);
    setIsModel(false);
    toast.success('Group created successfully !.');
    setUserGroups((prevState)=>[...prevState,createdGroup?.data.data]);
  }

  function onSubmitFormData(event)
  {
    if(event.target.checked)
    {
      setIsUsers([...isUsers,event.target.id]);
    }
    else{
      setIsUsers([...isUsers.filter(ele=>event.target.id!=ele)])
    }
  }

  const getUserGroupsAndPersonalChats = async() =>{
    const groups = await axios.get('http://localhost:3005/groups');
    console.log('user data : ',currentUser);
    console.log(' user groups : ',groups);
  }
  
  // useEffect(async() => {
    // await getUserGroupsAndPersonalChats();
  // }, [])
  

  return (
    <>
      { !token ? (
        <Navigate to="/signin" replace={true} />
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="container">
            <Header />

            {/* Buttons for creating groups and one-to-one personal chats */}
            <div className="btns">
              <div className="add-group-btn button" onClick={()=>{setGroupModel(true);setIsModel(true);setUserModel(false)}}>
                <MdGroupAdd />
                <span>Add Group</span>
                </div>
              <div className="add-user-btn button" onClick={()=>{setUserModel(true);setIsModel(true);setGroupModel(false)}}> 
                <MdPersonAddAlt1 />
                <span>Add User</span>
              </div>
            </div>

          {/* models of group or user for creating chats */}
            <div className={`input-container ${isModel ? '': 'hide'}`}>
                <div className={`grp-box  ${groupModel ? '':'grp-model'}`}>
                  <div className="field">
                    <div >Name* </div>
                    <input type="text" id="name" value={name} onChange={(event)=>setName(event.target.value)}  placeholder='Enter Group Name ...' required />
                    <div className={`${submitClick ? name.length ==0 ? 'error':'solve':'solve'} `}>Name* is required.</div>
                  </div>
                  <div className="field">
                    <div >members* </div>
                    <input type="text" id="users" value={`${isUsers.map((element,index)=>element)}`}   placeholder='select the users to add into group ...' required />
                    <div className={`${submitClick ? isUsers.length ==0 ? 'error':'solve':'solve'} `}>No Users* has been added</div>
                  </div>
                  <div className="list">
                    <ul>
                      {fetchUsers.map((user,index)=><li key={index}> <input type="checkbox"   name="check"  className="click" onClick={onSubmitFormData}   id={`${user.name}`}/> <span>{user.name}</span></li>
                      )}
                    </ul> 
                  </div>
                  <div className="create-grp-btns">
                    <button className='cancel' onClick={onCancelModel}>Cancel</button>
                    <button className='create' onClick={onCreateGroup}>Create Group</button>
                  </div>
                </div>
                <div className={`user-box  ${userModel ? '':'user-model'}`}>
                  <div className="field">
                    <div >members* </div>
                    <input type="text" id="users" value={`${selectedUser && selectedUser}`}   placeholder='select the user to start the chat ...' required />
                    <div className={`${submitClick ? selectedUser.length == 0 ? 'error':'solve':'solve'} `}>No User* has been selected</div>
                  </div>
                  <div className="list">
                    <ul>
                      {fetchUsers.map((user,index)=><li key={index}> <input type="radio"  name="check"  className="click" onClick={(e)=>setSelectedUser(e.target.id)}   id={user.name}/> <span>{user.name}</span></li>
                      )}
                    </ul> 
                  </div>
                  <div className="create-grp-btns">
                    <button className='cancel' onClick={onCancelModel}>Cancel</button>
                    <button className='create' onClick={onCreateUser}>Start Chat</button>
                  </div>
                </div>
            </div>
                
            <div className="list-container">
              <div className="group-list">
              {
                userGroups?.length == 0 && <h1>No Groups user have, create a new one !</h1>  
              }
              {
                userGroups?.length > 0 && (userGroups.map((group,index)=>{
                  return <Link to={`/${id}/groups/${group._id}`} key={group._id}> <div className="group-list-item" key={group.id}>
                  <div className="group-name">
                    <MdGroupAdd />
                    <span>{group.name}</span>
                  </div>
                  <div className="group-options">
                    <SlOptionsVertical />
                  </div>
                </div>
                </Link>
                }))
              }
                
              </div>

              {/* user list  */}

              <div className="user-list">
              {
                userChats?.length == 0 && <h1> No friends chats available , create a new one .</h1>
              }
              {
                userChats?.length > 0 && userChats.map((friend,index)=>{
                  return <Link to={`/${id}/chats/${friend._id}`} key={friend._id}> <div className="user-list-item" key={index}>
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>{currentUser.name == friend.userNames[0]?friend.userNames[1]:friend.userNames[0]}</span>
                  </div>
                  <div className="user-options">
                  <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user-options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }
                  </div>
                </div>
                </Link> 
                })
              }
               
                {/* <div className="user-list-item">
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>Abdul</span>
                  </div>
                  <div className="user-options"> <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user-options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }</div>
                </div>
                <div className="user-list-item">
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>Razzak</span>
                  </div>
                  <div className="user-options">
                  <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user-options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }
                  </div>
                </div>
                <div className="user-list-item">
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>Qureshi</span>
                  </div>
                  <div className="user-options">
                  <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user-options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }
                  </div>
                </div>
                <div className="user-list-item">
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>Azam</span>
                  </div>
                  <div className="user-options">
                  <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user-options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }
                  </div>
                </div>
                <div className="user-list-item">
                  <div className="user-name">
                    <MdPersonAddAlt1 />
                    <span>Ghouse</span>
                  </div>
                  <div className="user-options">
                  <SlOptionsVertical onClick={(e)=>setOptions(false)} />
                    { 
                      options && <div className="user -options-list">
                        <div>Delete</div>
                        <div>Edit</div>
                        <div onClick={(e)=>setOptions(false)}>Cancel</div>
                      </div>
                    }
                  </div>
                </div> */}
              </div>
            </div>

            <Link to={`/${id}/groups/CSEBuddies`}>
              <button>Group</button>
            </Link>
            <Link to={`/${id}/chats/qureshi`}>
              <button>UserChat</button>
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default Home 