import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhmcs, FaFileArchive, FaRegChartBar, FaAddressBook} from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
    <Link to={'/admin'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaAddressBook/><h1>
            Home</h1></Link>
           <Link to={'/admin/files'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaFileArchive /><h1>Files</h1></Link>
           <Link to={'/admin/analytics'} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center'><FaRegChartBar/><h1>Analytics</h1></Link>
        
    </>
  )
}

export default AdminMenu