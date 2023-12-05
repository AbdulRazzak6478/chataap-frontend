import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import Cookies from "js-cookie";  

const SignUp = () => {
    const [isSignIn, setIsSignIn] = useState(false)
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    function OnSetFormData(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    }
   
    let token = Cookies.get("jwt_token");  
    async function onSubmitData(event){
        event.preventDefault();
        setIsSignIn(false)
        setLoading(true)
        setActive(true);
        console.log('onsubmit data click');
        console.log('form data : ',formData);
        const customConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const user = await axios.post("http://localhost:3005/signin",formData,customConfig);
        console.log('user  : ',user.data.data);
        if(user.data.data.exist)
        {
            toast.error(`${user.data.data.message} , Please Login`);
            setLoading(false);
            return ;
        }
        setFormData({
            email:'',
            password:'',
        });
        const jwtToken = user.data.data.token;
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000*60*60;
        // storing jwt token into cookies
        Cookies.set('jwt_token', jwtToken, { expires: 1 });
        console.log("token : ", jwtToken);
        console.log(`userid : ${user.data.data.userData.id} storing in localstorage`);

        // storing user id into local storage
        localStorage.setItem("chatAppUserId", JSON.stringify(user.data.data.userData.id));
        let chatUserId = JSON.parse(localStorage.getItem("chatAppUserId"));
        console.log('user id : ',chatUserId);
        console.log('successfully register')
        toast.success("SignIn Successfully !");
        setActive(false);
        setLoading(false);
        setIsSignIn(true);
    }
  return (
    <>
        {   token ? (<Navigate to={`/${JSON.parse(localStorage.getItem("chatAppUserId"))}`} replace={true} />):
            isSignIn ? (
                <Navigate to={`/${JSON.parse(localStorage.getItem("chatAppUserId"))}`} replace={true} />
            ):
            (
            <div className="signup">
                <div className="title">Sign In</div>
                <form action="">
                    <div className="field">
                        <div >Email* </div><input type="text" id="email" value={formData.email} onChange={OnSetFormData}  placeholder='Enter Your Email ...' required />
                        <div className={`${!active ? 'solve': formData.email.length === 0 ? 'error': 'solve' } `}>Email* is required.</div>
                    </div>
                    <div className="field">
                        <div >password* </div><input type="password" id="password" value={formData.password} onChange={OnSetFormData}  className='' placeholder='Enter Password ...' required />
                        <div className={`${!active ? 'solve': formData.password.length === 0 ? 'error': 'solve' } `}>Password* is required.</div>
                    </div>
                    <button type="submit" className={`register sign ${loading ? 'load':''}`} onClick={onSubmitData}>{ loading ? "Loading ..." : "Sign In"}</button>
                    <div className="options">
                        <div className="up">Don't have a account? <Link to="/signup"><span>Sign Up</span> </Link></div>
                        <div className="forget">Forget Password</div>
                    </div>
                </form>
            </div> 
            )
        }
    </>
  )
}

export default SignUp;