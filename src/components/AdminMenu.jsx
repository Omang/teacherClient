import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaFileArchive, FaRegChartBar, FaAddressBook, FaUniversity} from "react-icons/fa";
import NotificationContext from '../NotificationContext';
import axios from 'axios';

const AdminMenu = ({id, token, role}) => {
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
    <Link to={`/admin/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAddressBook/><h1>
            Home</h1></Link>
           <Link to={`/admin/files/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaFileArchive />
           <h1>Files</h1></Link>
           <Link to={`/admin/analytics/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaRegChartBar/>
           <h1>Analytics</h1></Link>
           <Link to={`/admin/schools/${id}/${token}/${role}`} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaUniversity/>
           <h1>Schools</h1></Link>
           <button onClick={logout}  className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaPowerOff/><h1>Logout</h1></button>
        
    </>
  )
}

export default AdminMenu