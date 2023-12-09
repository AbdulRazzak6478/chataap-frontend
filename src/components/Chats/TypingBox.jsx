import React from 'react'

const TypingBox = () => {
  return (
    <>
        <div className="typing-box">
            {/* <div className=""> */}
                <input type="text" className='' placeholder='Start Typing ...' />
                <div className="send-icon">@</div>
            {/* </div> */}
        </div>
    </>
  )
}

export default TypingBox