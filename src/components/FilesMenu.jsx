import React from 'react'
import { Link, useParams } from 'react-router-dom'

const FilesMenu = ({id, token, role}) => {
  return (
    <>
    <div className='flex flex-row mt-2 justify-center items-center gap-4'>
              <Link to={`/admin/files/pending/${id}/${token}/${role}`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Pending</Link>
              <Link to={`/admin/files/approve/${id}/${token}/${role}`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Approved</Link>
              <Link to={`/admin/files/messages/${id}/${token}/${role}`} className='border rounded-lg border-blue-500 px-3 hover:bg-blue-500 hover:text-white'>Messages</Link> 
           </div>
    </>
  )
}

export default FilesMenu