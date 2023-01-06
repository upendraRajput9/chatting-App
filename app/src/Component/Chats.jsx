import React,{ useContext,useState } from 'react'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firbase'
import { AuthContext } from './Context/AuthContext'
import { ChatContext } from './Context/ChatContext'
import { ActiveContext } from './Context/ActiveContext'

const Chats = () => {
    const [chats,setChats] = useState([])
    const {currentUser} = useContext(AuthContext)
    const {data,dispatch} = useContext(ChatContext)
    const {active,dispatchBtn}= useContext(ActiveContext)
    
 
    const icon ="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    //handle select
    const handleSelect =(userInfo)=>{
     
dispatch({type:"ChangeUser",payload:userInfo})

dispatchBtn({type:"Turn_ON"})
    }
    //useState
    useEffect(()=>{
        const getChats=()=>{
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data())
        });
        return ()=>{
            unsub()
        }
    }

    currentUser.uid&&getChats()
    },[currentUser.uid])
    
  return (
    <div className="chats">
       { Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat=>  
    
       <div key={chat[0]} className={`chat-user ${chat[1].userInfo.uid===data.user.uid&&"active"}`}>
  <article className='userChats'  onClick={()=>handleSelect(chat[1].userInfo)}>
  <img src={chat[1].userInfo.photoURL?chat[1].userInfo.photoURL:icon} alt="#" />
  <div>
     <h3>{chat[1].userInfo.displayName}</h3>
     <span>{chat[1].lastMessage?.text}</span>
     </div>
  </article>
  </div>
       
  )}
    </div>
  )
}

export default Chats
