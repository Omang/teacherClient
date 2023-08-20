import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhmcs, FaFileArchive, FaRegChartBar, FaAddressBook} from "react-icons/fa";
import AdminMenu from '../components/AdminMenu';

const Admin = () => {
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
            <AdminMenu />
           </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaAddressBook/></div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaRegChartBar /></div>
           </div>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaFileArchive/></div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaWhmcs/></div>
           </div>
        </div>

    </div>
  )
}

export default Admin