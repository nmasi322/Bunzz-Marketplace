import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  return (
    <div>
        <div className='py-6'>
            <Link className='text-lg' to="/new" >New Meme</Link><br/><br/>
            <Link className='text-lg' to="/view" >View Meme</Link><br/><br/>
            <Link className='text-lg' to="/" >Profile</Link>
        </div>
    </div>
  )
}

export default MobileNav