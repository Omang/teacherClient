import React, {useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import {FaEmpire, FaReadme, FaPowerOff, FaAddressBook, FaAward} from "react-icons/fa";
import Logout from './Logout';

import NotificationContext from '../NotificationContext';
import axios from 'axios';

const TeacherMenu = ({token, id, role}) => {
  const {notificationHandler} = useContext(NotificationContext);
  const [redirect, setRedirect] = useState(null);
  const logout = async()=>{
    //console.log('working')
    try{
      console.log('working')
      notificationHandler({type:'warning', message:'Logout success...Next time'});
        setRedirect('/');
       // setUser(null);
    }catch(e){
      console.log(e);
    }
}
if(redirect){
  return <Navigate to={redirect} />
}
  return (
    <>
    <Link to={`/teacher/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAddressBook/><h1>
            Home</h1></Link>
           <Link to={`/teacher/apps/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaReadme /><h1>Todo's</h1></Link>
           <Link to={`/teacher/ranks/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAward/><h1>Ranks</h1></Link>
           <button onClick={logout} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center' >Logout</button>
        
    </>
  )
}

export default TeacherMenu