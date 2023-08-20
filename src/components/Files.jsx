import React from 'react'
import AdminMenu from './AdminMenu'
import { Link } from 'react-router-dom'
import FilesMenu from './FilesMenu'

const Files = () => {
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu />
          
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <FilesMenu />
        </div>

    </div>
  )
}

export default Files