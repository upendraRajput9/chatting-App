import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import { ChatContext } from './Context/ChatContext'

const Message = (props) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const {uid,photoURL}=currentUser
    const ref =useRef()
    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[props])
  
  return (
    <div className={`message ${props.senderId===uid&&"owner"}`} ref={ref}>
        <div className='messageInfo'>
   <img src={props.senderId===uid?photoURL:data.user.photoURL} alt="#" />
   <span>Just now</span>
   </div>
   <div className='messageContent'>{props.text.length>0&&
<p>{props.text}</p>}
{props.img&&
<img src={props.img} alt="" />
}
   </div>
    </div>
  )
}

export default Message
