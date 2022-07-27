import React from 'react'
import Navbar from '../components/Navbar'
import Bio from '../components/Bio'
import NewMeme from '../components/NewMeme'
import Memes from '../components/Memes'


const Profile = () => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
          <Bio/>
        </div>
        <div>
          {/* <Memes/> */}
        </div>
    </div>
  )
}

export default Profile