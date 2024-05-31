import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Quest from './pages/Quest'
import Login from './pages/Login'
import Header from './components/Header'
import './App.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    })
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  return (
    <BrowserRouter>
    <Header user={user}></Header>
    <Routes>
      <Route index path="/" element={<Home/>}></Route>
      <Route index path="/quests" element={<Home/>}></Route>
      <Route index path="/quests/:questNameParam" element={<Quest/>}></Route>
      <Route index path="/login" element={<Login user={user}/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
