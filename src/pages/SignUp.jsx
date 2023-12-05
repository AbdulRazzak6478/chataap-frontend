import React, { useState } from 'react'
import { Link,Navigate } from 'react-router-dom';
import  toast  from "react-hot-toast";
import axios from 'axios';
import Cookies from 'js-cookie';

const SignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [formData, setFormData] = useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword : ''
    });

    function OnSetFormData(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));

        console.log('form data : ',formData)
    }

    let token = Cookies.get("jwt_token");   
    async function onSubmitData(event){
        setIsSignUp(false);
        event.preventDefault()
        setLoading(true)
        setActive(true);
        console.log('onsubmit data click');
        console.log('form data : ',formData);
        const userDataPayload = {
            name : formData.userName,
            email : formData.email,
            password : formData.password,
        }
        const customConfig = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const user = await axios.post("http://localhost:3005/register",userDataPayload,customConfig);
        // const user = '1234567890'
        console.log('user  : ',user.data.data);
        if(user.data.data.exist)
        {
            toast.error(`${user.data.data.message} , Please Login`);
            setLoading(false);
            return ;
        }
        setFormData({
            userName:'',
            email:'',
            password:'',
            confirmPassword : ''
        });
        console.log('successfully register')
        toast.success("Sign Up Successfully !");
        setActive(false);  
        setLoading(false);
        localStorage.setItem("chatAppUserId", JSON.stringify(user.data.data.id));
        setIsSignUp(true)
    }
  return (
    <>
        {   token ? (<Navigate to={`/${JSON.parse(localStorage.getItem("chatAppUserId"))}`} replace={true} />):
            isSignUp ? (
                    <Navigate to="/" replace={true} />
                )
                :( 
            <div className="signup">
                <div className="title">Sign Up</div>
                <form action="">
                    <div className="field">
                        <div >UserName* </div><input type="text" value={formData.userName} id="userName" onChange={OnSetFormData} placeholder='Enter Your UserName ...' required />
                        <div className={`${!active ? 'solve': formData.userName.length === 0 ? 'error': 'solve' } `}>UserName* is required.</div>
                    </div>
                    <div className="field">
                        <div >Email* </div><input type="text" id="email" value={formData.email} onChange={OnSetFormData}  placeholder='Enter Your Email ...' required />
                        <div className={`${!active ? 'solve': formData.email.length === 0 ? 'error': 'solve' } `}>Email* is required.</div>
                    </div>
                    <div className="field">
                        <div >password* </div><input type="password" id="password" value={formData.password} onChange={OnSetFormData}  className='' placeholder='Enter Password ...' required />
                        <div className={`${!active ? 'solve': formData.password.length === 0 ? 'error': 'solve' } `}>Password* is required.</div>
                    </div>
                    <div className="field">
                        <div >Confirm Password* </div><input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={OnSetFormData}  placeholder='Enter Password ...' required />
                        <div className={`${!active ? 'solve': formData.confirmPassword.length === 0 ? 'error': 'solve' } `}>Please Confirm Your Password*.</div>
                    </div>
                    <button type="submit" className={`register sign ${loading ? 'load':''}`} onClick={onSubmitData}>{ loading ? "Loading ..." : "Sign Up"}</button>
                    <div className="options">
                        <div className="up">Already have an account! <Link to="/signin"><span>Sign In</span> </Link></div>
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