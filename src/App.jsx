import { useRef, useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Header from './components/Home/Header'
import Home from './components/Home/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {Toaster} from 'react-hot-toast'
import Join from './pages/Join'
import GroupChat from './pages/GroupChat'
// // import { io } from 'socket.io-client';
// // import socketIO from 'socket.io-client';

// const socket = socketIO('http://localhost:3000/',{
//   transports:['websocket']
// });
// const [count, setCount] = useState(0)
// // socket.on('connect',(arg)=>{
// //   console.log('socket connect from clientside',arg)
// // })
// socket.emit('hello',{
//   message: 'world'
// });
// socket.on('world',(msg)=>{
//   console.log('from server',msg)
// })
// // const socket = io('http://localhost:3000/');
// // const socket = io();
function App() {
  return (
    <>
    <div className="app">
      <Router>
        {/* <Header /> */}
        <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/:userid/groups/:groupid" element={<GroupChat />} />
        </Routes>
        <Toaster /> 
      </Router>
    </div>
    </>
  )
}

export default App
