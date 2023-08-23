import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu'
import axios from 'axios';


const School = () => {
    const {id, token, role, schoolid} = useParams();
    const [school, setSchool] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [teacheradded, setTeacheradded] = useState('');
    const [teachers, setTeachers] = useState([]);

    const Addteacher = async(e)=>{
         e.preventDefault();
         try{
            setTeacheradded('');
            const {data} = await axios.put('/rep/addteacher',{
                id: schoolid,
                firstname: firstname,
                lastname: lastname,
                email: email
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              }
            });

            if(data.message){
                setTeachers(prev=>[...prev, data]);
                setFirstname('');
                setLastname('');
                setSubject('');
                setEmail('');
                setTeacheradded('Teacher added Successful');
            }else{
            setTeachers(prev=>[...prev, data]);
            setFirstname('');
            setLastname('');
            setSubject('');
            setEmail('');
            setTeacheradded('Teacher added Successful');
            }

         }catch(e){
            console.log(e);
         }
    }
    const geteachers = async()=>{
         try{
            const {data} = await axios.get('/rep/schooltechers/'+schoolid, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              }
            });

            setTeachers(data);

         }catch(e){
            console.log(e);
         }
    }
    const getone = async()=>{
        try{
           const {data} = await axios.get('rep/getschool/'+schoolid,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          })
          setSchool(data);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
       if(!id){
        return;
       }
       getone();
       geteachers();
    },[id])
    return (
      <div className='flex flex-row px-4 mt-8'>
          <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
            <AdminMenu id={id} token={token} role={role} />
              </div>
  
          <div className=' flex flex-col w-[780px] h-[440px]'>
             {school && (
                <div className='flex flex-row gap-4 bg-blue-600 mx-4 px-8 text-white font-bold'>
                     <h1>{school.school_name}</h1>
                     <h1>{school.school_level}</h1>
                     <h1>{school.school_location}</h1>
                </div>
             )}
             <div className="flex flex-row m-3 gap-1">
             <div className="flex flex-col w-1/2 m-1 p-1 border-r border-blue-500">
                <h1 className="text-lg underline font-semibold ">Teachers</h1>
            {teachers && (<>
                 {teachers.map(dat=>(
                    <div  className='flex flex-row m-2 p-1 gap-2 hover:bg-blue-700 bg-blue-400 text-white' key={dat._id}>
                         <h1 >{dat.firstname}</h1>
                         <h1 >{dat.lastname}</h1>
                    </div>
                 ))}
            </>)}
             </div>
             <div className="flex flex-col w-1/2 m-1 p-1">Add Teachers
             <form className='flex flex-col p-2' onSubmit={Addteacher}>
            {teacheradded && (
                <h1 className='text-sm font-semibold text-red-500'>{teacheradded}</h1>
            )}
           <input type="text" placeholder='Teacher firstname ' required value={firstname} onChange={e=>setFirstname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           
           <input type="text" placeholder='Teacher Lastname' required value={lastname} onChange={e=>setLastname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="email" placeholder='Teacher Email' required value={email} onChange={e=>setEmail(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <input type="text" placeholder='Teacher Subject' required value={subject} onChange={e=>setSubject(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           
           <div className="flex flex-row justify-between">
            <p>Ask me!</p>
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Add</button>
           
           </div>
        </form>
             </div>
             </div>
          </div>
  
      </div>
    )
}

export default School