import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Notification from './utils/Notification'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import MainPage from './pages/MainPage'
import Stats from './pages/Stats'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Analytics from './components/Analytics'
import Files from './components/Files'
import Ranks from './components/Ranks'
import Settings from './components/Settings'
import TeacherApps from './components/TeacherApps'

function App() {
  

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
       <Route index element={<IndexPage/>} />
       <Route path='/admin' element={<Admin/>} />
       <Route path='/admin/files' element={<Files/>} />
       <Route path='/admin/analytics' element={<Analytics />} />
       <Route path='/teacher' element={<MainPage/>} />
       <Route path='/teacher/apps' element={<TeacherApps/>} />
       <Route path='/teacher/ranks' element={<Ranks/>} />

       <Route path='/register' element={<Register/>} />
       
      </Route>
    </Routes>
    <Notification />
    </UserContextProvider>
  )
}

export default App
