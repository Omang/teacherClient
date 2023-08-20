import React from 'react'
import { Link } from 'react-router-dom'

const FilesMenu = () => {
  return (
    <>
    <div className='flex flex-row mt-2 justify-center items-center gap-4'>
              <Link className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Pending</Link>
              <Link className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Approved</Link>
              <Link className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Cancelled</Link> 
           </div>
    </>
  )
}

export default FilesMenu