import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Profile from './pages/profile'
import NewMemePage from './pages/NewMemePage'
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
