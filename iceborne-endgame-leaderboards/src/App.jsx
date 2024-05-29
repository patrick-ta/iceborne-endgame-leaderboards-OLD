import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import QuestList from './components/QuestList'
import Home from './pages/Home'
import Quest from './pages/Quest'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/home" element={<Home/>}></Route>
      <Route index path="/quest/:questNameParam" element={<Quest/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
