import React from 'react'
import Chat from './Chat'
import Aside from './Aside'

const Home = () => {
  return (
    <div className='home'>
        <div className="container">
<Aside/>
<Chat/>
</div>
    </div>
  )
}

export default Home
