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
import ApprovedDocs from './pages/ApprovedDocs'
import PendingDocs from './pages/PendingDocs'
import DocPage from './pages/DocPage'
import MessagePage from './pages/MessagePage'
import Profile from './components/Profile'

axios.defaults.baseURL = 'https://theserver-vcsj.onrender.com';

function App() {
  

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
       <Route index element={<IndexPage/>} />
       <Route path='/profile/:id/:token/:role' element={<Profile />} />
       <Route path='/admin/:id/:token/:role' element={<Admin/>} />
       <Route path='/admin/files/:id/:token/:role' element={<Files/>} />
       <Route path='/admin/files/approve/:id/:token/:role' element={<ApprovedDocs />} />
       <Route path='/admin/files/pending/:id/:token/:role' element={<PendingDocs />} />
       <Route path='/admin/files/messages/:id/:token/:role' element={<MessagePage />} />
       <Route path='/admin/analytics/:id/:token/:role' element={<Analytics />} />
       <Route path='/teacher/:id/:token/:role' element={<MainPage/>} />
       <Route path='/teacher/apps/:id/:token/:role' element={<TeacherApps/>} />
       <Route path='/teacher/ranks/:id/:token/:role' element={<Ranks/>} />

       <Route path='/register' element={<Register/>} />
       
      </Route>
    </Routes>
    <Notification />
    </UserContextProvider>
  )
}

export default App
