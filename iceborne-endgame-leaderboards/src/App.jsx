import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom'
import Home from './pages/Home'
import Quest from './pages/Quest'
import Rules from './pages/Rules'
import About from './pages/About'
import Login from './pages/Login'
import Header from './components/Header'
import Unauthorized from './pages/Unauthorized'
import Submit from './pages/Submit'
import Submissions from './pages/Submissions'
import UserRoute from './components/UserRoute'
import ModeratorRoute from './components/ModeratorRoute'
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
      <Route index path="/iceborne-endgame-leaderboards" element={<Home/>}></Route>
      <Route index path="/" element={<Home/>}></Route>
      <Route index path="/quests" element={<Home/>}></Route>
      <Route index path="/rules" element={<Rules/>}></Route>
      <Route index path="/about" element={<About/>}></Route>
      <Route index path="/quests/:questNameParam" element={<Quest/>}></Route>
      <Route index path="/login" element={<Login user={user}/>}></Route>
      <Route index path="/unauthorized" element={<Unauthorized/>}></Route>
      <Route index path="/submit" element={
        <UserRoute user={user}>
          <Submit/>
        </UserRoute>
      }></Route>
      <Route index path="/submissions" element={
        <ModeratorRoute user={user}>
          <Submissions/>
        </ModeratorRoute>
      }></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
