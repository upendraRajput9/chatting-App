import React, { useContext } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { ActiveContext } from './Context/ActiveContext'


const Aside = () => {
    const {active,dispatchBtn}= useContext(ActiveContext)
   
    return (
        <div className={`aside ${active&&"turnOff"}`}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Aside
