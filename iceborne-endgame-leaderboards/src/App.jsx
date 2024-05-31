import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import QuestList from './components/QuestList'
import Home from './pages/Home'
import Quest from './pages/Quest'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Home/>}></Route>
      <Route index path="/quests" element={<Home/>}></Route>
      <Route index path="/quests/:questNameParam" element={<Quest/>}></Route>
      <Route index path="/login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
