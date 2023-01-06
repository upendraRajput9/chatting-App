import React,{useState,useContext} from 'react'
import Message from './Message'
import { ChatContext } from './Context/ChatContext'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firbase'

const Messages = () => {
    const [messages,setMessages]=useState([])
    const {data,dispatch} = useContext(ChatContext)
    useEffect(()=>{
const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
    doc.exists()&&setMessages(doc.data().messages)
})
return ()=>{
    unSub()
}
    },[data.chatId])
  return (
    <div className='messages'>
        {messages.map((message)=>
          <Message {...message} key={message.id}/>)
        }
      
      
    </div>
  )
}

export default Messages
