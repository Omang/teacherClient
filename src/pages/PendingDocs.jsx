import React, {useState, useEffect, useContext} from 'react'
import AdminMenu from '../components/AdminMenu'
import FilesMenu from '../components/FilesMenu'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const PendingDocs = () => {
  const {id, token, role} = useParams();
  const [datx, setDatx] = useState([]);
  const getPending = async()=>{
    try{

      const {data} = await axios.post('/license/getpending',{id:id});

      setDatx(data);

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    if(!id){
      return;
    }
    getPending();
  },[id])

  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <FilesMenu id={id} token={token} role={role} />
           {datx ? <>
              <div className="flex flex-col m-4 border rounded-sm p-2">
                    {datx.map(doc=>(<>
                       <div key={doc._id} className="border hover:bg-blue-100 m-3 flex flex-row justify-between border-blue-500 rounded-xs">
                       <h1>Firstname: {doc.user_id.firstname}</h1>
                       <h1>Lastname: {doc.user_id.lastname}</h1>
                       <h1>License: {doc.license_type}</h1>
                       <h1>Subject: {doc.license_subject}</h1>
                       <Link to={`/admin/files/pending/application/${id}/${token}/${role}/${doc._id}`} className='bg-blue-500 text-white cursor-pointer'>View more</Link>
                       </div>
                    </>))}
              </div>
           </> : 'No pending Application'}
        </div>

    </div>
  )
}

export default PendingDocs