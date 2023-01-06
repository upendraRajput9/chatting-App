import React, { Children, useContext } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import SignIn from './Component/SignIn'
import SignUp from './Component/SignUp'
import Home from './Component/Home'
import { AuthContext } from './Component/Context/AuthContext'



const App = () => {
    const {currentUser}=useContext(AuthContext)


const protectRoute=(child)=>{
if(!currentUser){
    return <Navigate to="/signIn"/>
}
return child
}
  return (
    <div>
       
      <Routes>
       <Route path='/'>
          <Route index element={
            protectRoute( <Home/>)
     } />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
      </Routes>
    </div>
  )
}

export default App
