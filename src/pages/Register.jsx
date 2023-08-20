import axios from 'axios';
import React, { useState, useContext } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { GridLoader } from 'react-spinners';
import NotificationContext from '../NotificationContext';

const Register = () => {
  const [mobile, setMobile] =useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading , setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState('');
  const [exist, setExist] = useState('');
  const {notificationHandler} = useContext(NotificationContext)

  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setRole(option);
    console.log(option);

}

const registeruser = async(e)=>{
  e.preventDefault();
  setLoading(true)
  try{
    const response = await axios.post('/user/register', {mobilenumber:mobile, 
    password:password, role:role});
    console.log(response.data.message);
    if(response.data.message === 'Registered successful'){
       setLoading(false);
       notificationHandler({type:'success', message:'Registration Successful'});
       setRedirect('/login');

    }else{
       setLoading(false);
       setExist(response.data.message);
       notificationHandler({type:'warning', message:'User exists! please log..'});

    }
    
    
  }catch(e){
    setLoading(false);
    setError('something happend! try again');
  }

}
if(redirect){
  return <Navigate to={redirect} />
}

  return (
    <div className=' flex items-center justify-center mt-8'>
      <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <form className='flex flex-col p-2' onSubmit={registeruser}>
           {error &&(
            <p className='px-5 text-sm text-red-500 font-bold'>{error}</p>
           )}
           {exist &&(
            <p className='px-1 text-sm text-yellow-500 font-bold'>User exists! please login</p>
           )}
           <input required type="number" value={mobile} onChange={e=>setMobile(e.target.value)} placeholder='Your Mobile number' className='border border-blue-500 rounded-full m-3 px-3' />
           <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter password' className='border border-blue-500 rounded-full m-3 px-3' />
           <select onChange={onchangeHandler} type="text"  className='border border-blue-500 rounded-full m-3 px-3 '>
           
            <option>--Select role--</option>
            <option id={'student'} >Student</option>
            <option id={'public'} >Public</option>
          
           </select>
           <div className="flex flex-row justify-between">
            <Link className='underline hover:text-blue-600 text-red-600' to={'/'}>Go Back</Link>
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Register</button>
           <Link className='underline hover:text-blue-600 text-red-600' to={'/'}>Login</Link>
           </div>
        </form>}
      </div>
    </div>
  )
}

export default Register
