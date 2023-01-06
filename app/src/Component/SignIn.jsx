import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firbase';
import Img from "../img/addAvatar.png"


const SignIn = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      setErr(false)
      navigate('/')
    } catch (error) {
      setErr(true)
    }

  }
  return (
    <div id='sign' className='signUp signIn' >
      {/* SIGN_UP_BUTTON_SECTION */}
      <section className='left'>
        <h2>UP Chat!</h2>
        <h3>Welcome Back</h3>
        <button onClick={() => navigate('/signUp')}>Create Account</button>
      </section>
      {/* SIGN_IN_SECTION */}
      <section className='right'>
        <div className='right-container'>
          <h1>Sign IN!</h1>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" />
            <label>Password</label>
            <input type="password" />
            <input type="submit" value="Sign In" />
          </form>
          <span >{err && "Password is not correct"}</span>
        </div>
      </section>
    </div>
  )
}

export default SignIn
