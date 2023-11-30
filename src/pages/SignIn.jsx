import React from 'react'

const SignIn = () => {
  return (
    <>
        <div className="signin">
            <div className="title">Sign In</div>
            <form action="">
                <div className="field">
                    <label >Email : </label><input type="text" placeholder='Enter Your Email ...' required />
                </div>
                <div className="field">
                    <label >password : </label><input type="password" className='hide' placeholder='Enter Password ...' required />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    </>
  )
}

export default SignIn