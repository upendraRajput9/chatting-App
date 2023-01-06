import React, { useContext } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from './Context/AuthContext'
import { ChatContext } from './Context/ChatContext'
import { useState } from 'react'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firbase'
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {

        if (img) {
            const storageRef = ref(storage, uuidv4());
            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuidv4(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                    });
                });
            });

        } else if(text.length>0) {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        setImg(null)
        setText("")
    }
    return (
        <div className='input'>
            <input  type="text" placeholder='Type something...'
             value={text}
             onChange={e => setText(e.target.value)} 
             onKeyPress={e=>{
                if (e.key === 'Enter') {
                  handleSend()
                }
              }}
             />
            <div className='send'>
                <img src={Attach} alt="" />
                <input 
                  type="file" style={{ display: "none" }}
                   id="file"
                   onKeyPress={e=>{
                    if (e.key === 'Enter') {
                      handleSend()
                    }
                  }
                }
                    onChange={e => setImg(e.target.files[0])} 
                    />
                <label htmlFor='file'>
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
