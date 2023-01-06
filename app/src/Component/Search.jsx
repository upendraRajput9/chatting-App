import React, { useState, useContext } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from './Context/AuthContext';

import { db } from '../firbase';

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState();
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const citiesRef = collection(db, "users");
        // Create a query against the collection.
        const q = query(citiesRef, where("displayName", "==", username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setErr(true)
        }

    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    //handleSelecte
    const handleSelect = async () => {
//COMBINED_ID_FOR_START_CONVERSATION
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
                setUsername("")
                setUser(null)
            }
        } catch (error) {
            setErr(true)
        }
        setUsername("")
        setUser(null)
    }
    return (
        <div className='search'>
            {/* SEARCH_BAR */}
            <div className='search-input'>
                <input type="search"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder='Find a user...' />
                <button type="submit" onClick={handleSearch}>Search</button>

            </div>{
                // SEARCHED_USER
                user && <article onClick={handleSelect}>
                    <img src={user.photoURL} alt="#" />
                    <div>
                        <h3>{user.displayName}</h3>
                    </div>
                </article>
            }
            {err && <p>"User is not found"</p>}
        </div>
    )
}

export default Search
