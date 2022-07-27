import React, {useState} from 'react'
import { FaHamburger } from 'react-icons/fa'
import MobileNav from './MobileNav';

const Navbar = () => {
  const [show, setShow] = useState(false)
  function showHandler() {
    setShow(!show);
  }
  return (
    <div className='text-center relative py-5 bg-[#592693] text-gray-200 px-10'>
        <div className='flex space-x-10'>
          <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Buzzz</h1>
          </div>
          {/* <div>
              <input className='w-96 border-gray-500 py-2 rounded text-gray-600 px-5 outline-none' type="search" placeholder="Search items and memes!" />
          </div> */}
          <div onClick={showHandler} className='absolute right-10'>
          {
            show ? <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-10 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-10 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
          </div>
        </div>
        <div>
          {
            show && <MobileNav />
          }
        </div>
    </div>
  )
}

export default Navbar