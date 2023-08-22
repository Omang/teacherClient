import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEmpire, FaReadme, FaWhmcs, FaAddressBook, FaAward} from "react-icons/fa";
import TeacherMenu from '../components/TeacherMenu';
import axios from 'axios';

const MainPage = () => {
  const {id, token, role} = useParams();
  const [datax, setDatax] = useState({});
  //console.log(token);
  const getuser = async()=>{
    try{
      const {data} = await axios.get('/user/getuser/'+id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      setDatax(data);
      
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
     if(!id){
      return;
     }
     getuser();
  },[id]);
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <TeacherMenu token={token} id={id} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaAddressBook/>
            <div className="flex flex-col m-2">
              {datax && (<>
                 <h1 className='font-semibold text-xl underline'> Names: {datax.firstname} {datax.lastname}</h1>
                 <p className='font-semibold text-lg'>Born: {datax.DOB}</p>
                 <p className='font-semibold text-lg'> Born At: {datax.POB}</p>
                 <p className='font-semibold text-lg'> Gender: {datax.gender}</p>
                 
              </>)}
            </div>
            </div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaReadme />
            <div className='flex flex-col m-3'>
            <h1 className='font-bold text-xl'>Qualifications</h1>
            {datax.certificates && (
              <>
              {datax.certificates.map(doc=>(
                <p className='font-semibold text-lg'>{doc} </p>
              ))}
             {datax && (<>
              <p className='font-semibold text-lg'> Qualification: {datax.experience}</p>
             </>)}
              </>
            )}
            </div>
            </div>
           </div>
           <div className='flex h-1/2 flex-row gap-4'>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaAward/></div>
            <div className='w-1/2 border border-blue-700 rounded-xl  m-2 flex justify-start p-2 shadow-lg'><FaWhmcs/></div>
           </div>
        </div>

    </div>
  )
}

export default MainPage