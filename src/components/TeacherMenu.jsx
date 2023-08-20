import React from 'react'
import { Link } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";

const TeacherMenu = () => {
  return (
    <>
    <Link to={'/teacher'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAddressBook/><h1>
            Home</h1></Link>
           <Link to={'/teacher/apps'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaReadme /><h1>Todo's</h1></Link>
           <Link to={'/teacher/ranks'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAward/><h1>Ranks</h1></Link>
        
    </>
  )
}

export default TeacherMenu