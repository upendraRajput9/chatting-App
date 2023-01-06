import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { AuthContext } from './Context/AuthContext'

import { useEffect } from 'react'
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from "../firbase"
import { collection, getDocs } from "firebase/firestore";
import { useState } from 'react';
import { ChatContext } from './Context/ChatContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const [users, setUser] = useState([])
  const [err, setErr] = useState(false);
  const [active, setActive] = useState(true)
  const { data, dispatch } = useContext(ChatContext)


  const icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  const listAllUsers = async () => {
    let arr = []
    const querySnapshot = await getDocs(collection(db, "users"));

    await querySnapshot.forEach((doc) => {
      currentUser.uid !== doc.data().uid && arr.push(doc.data())
    });
    setUser(arr)
    setActive(false)
  }


  //handle select
  //handleSelecte
  const handleSelect = async (user) => {
    
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
        const res = await getDoc(doc(db, "chats", combinedId))
       
        if (!res.exists()) {
            //created a chat collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] })
            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    [combinedId + ".date"]: serverTimestamp()
                }
            })

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    [combinedId + ".date"]: serverTimestamp()
                }
            })
          
        }
        setActive(true)
    } catch (error) {
        setErr(true)
    }

}
  return (
    <div className='navbar'>

{/* Find_ALL_USERS */}
      <div className={`chats all-user ${active && "unActive"}`} >
        <div className='newChat'>
          <button onClick={() => setActive(true)}><i className="fa-solid fa-arrow-left" /></button>
          <span> New Chats</span>
        </div>
        <div className='parent'>
          {users.map(chat =>
            <div className='chat-user' key={chat.uid}>
              <article className='userChats' onClick={() => handleSelect(chat)}>
                <img src={chat.photoURL} alt="#" />
                <div>
                  <h3>{chat.displayName}</h3>
                </div>
              </article>
            </div>

          )}
        </div>
      </div>

{/* CURRENT_LOGIN_USER_NAVBAR */}
      <article>
        <div>
          <img src={currentUser.photoURL ? currentUser.photoURL : icon
          } alt="#" />
          <h3>{currentUser.displayName}</h3>
        </div>
        <div>
          <i onClick={listAllUsers} className="fa-solid fa-user-plus" />
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </article>
    </div>
  )
}

export default Navbar
