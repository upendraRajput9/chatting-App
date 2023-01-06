import React, { useState } from 'react';
import { auth, storage, db } from '../firbase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Img from "../img/addAvatar.png"

const SignUp = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    //HandleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    downloadURL = await file ? downloadURL : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate('/')
                    } catch (err) {

                        setErr(true);

                    }
                });
            });

        } catch (err) {
            setErr(true);

        }
    };

    return (
        <div className='signUp' id='signUP'>
            {/* SIGN_UP_BUTTON_SECTION */}
            <section className='left'>
                <h2>UP Chat!</h2>
                <h3>Welcome Back</h3>
                <button onClick={() => navigate('/signIn')}>Sign In</button>
            </section>
            {/* SIGN_IN_SECTION */}
            <section className='right'>
                <div className='right-container'>
                    <h1>Sign Up!</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" />
                        <label>Email</label>
                        <input type="email" />
                        <label>Password</label>
                        <input type="password" />
                        <label className='addImg' htmlFor='file'>
                            <img src={Img} alt="#" />
                            <span>Add an avatar</span>
                        </label>
                        <input type="file" id='file' style={{ display: "none" }} />
                        <input type="submit" value="Sign UP" />
                    </form>
                    <span>{err && "Something went wrong"}</span>
                </div>
            </section>
        </div>
    )
}

export default SignUp
