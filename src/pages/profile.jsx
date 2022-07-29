import React from 'react'
import Navbar from '../components/Navbar'
import Bio from '../components/Bio'
import NewMeme from '../components/NewMeme'
import Memes from '../components/Memes'
import Footer from '../components/Footer'


const Profile = () => {
  return (
    <div className='relative'>
        <div>
            <Navbar/>
        </div>
        <div className='min-h-[80vh]'>
          <Bio/>
        </div>
        <div className=''>
          <Footer />
        </div>
    </div>
  )
}

export default Profile