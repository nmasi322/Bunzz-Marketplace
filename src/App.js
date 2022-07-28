import React from 'react'
import Mint from './pages/Mint'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Signup from './pages/signup'
import Profile from './pages/profile'
import NewMemePage from './pages/NewMeme'
import ViewMeme from './pages/ViewMeme'

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                {/* <Route path='*' element={<NotFound/>} /> */}
                <Route path='/' element={<Profile/>} />
                <Route path='/new' element={<NewMemePage/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path="/view" element={<ViewMeme/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
