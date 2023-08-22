import React, { useState, useContext } from 'react'
import {Link, Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import NotificationContext from '../NotificationContext';
import { GridLoader } from 'react-spinners';
//import { GridLoader } from 'react-spinners';
import axios from 'axios';

const IndexPage = () => {
    const [mobilenum, setMobilenum] = useState('');
    const [pass, Setpass] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [err, setErr] = useState('');
    const {user, setUser, setReady} = useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
  
    const loginuser = async(ev)=>{
      ev.preventDefault();
      setLoading(true);
       setErr('');
      try{
         console.log({email: mobilenum, password: pass})
        const {data} =await axios.post('/user/login', { email: mobilenum, password: pass})
        //console.log(data);
        setUser(data);
        if(data?.message){
            setLoading(false);
            setErr(data?.message);
        }else{
          //setUser(data);
          setLoading(false);
          setReady(true);
          console.log(user);
          notificationHandler({type:'success', message:'Login success...Welcome client'});
          const id = data._id;
          const token = data.refreshToken;
          const role = data.role;
          if(data.role === 'teacher'){
           
                if(data.firstname){
                  setRedirect(`/teacher/${id}/${token}/${role}`);
                }else{
                  setRedirect(`/profile/${id}/${token}/${role}`);
                }
          }else{
            
                if(data.firstname){
                  setRedirect(`/admin/${id}/${token}/${role}`);
                }else{
                  setRedirect(`/profile/${id}/${token}/${role}`);
                }
          }
                
          
  
        }
         
      }catch(error){
        setLoading(false);
        console.log(error);
        setErr('Something bad happend! try again');
      }
    }
    
    if(redirect){
      return <Navigate to={redirect} />
    }
  return (
    <div className=' flex items-center justify-center mt-8'>
      <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
      <h1>Login</h1>
        {err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          wrong Password / Email
        </p>)}
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <form className='flex flex-col p-2' onSubmit={loginuser}>
           <input type="email" placeholder='Enter your email' required value={mobilenum} onChange={e=>setMobilenum(e.target.value)} className='border border-blue-500 rounded-full m-3 px-3' />
           <input type="password" placeholder='Your password' required value={pass} onChange={e=>Setpass(e.target.value)} className='border border-blue-500 rounded-full m-3 px-3' />
           
           <div className="flex flex-row justify-between">
            <p>Ask me!</p>
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Login</button>
           <Link className='underline hover:text-blue-600 text-red-600' to={'/register'}>New account</Link>
           </div>
        </form>}
      </div>
    </div>
  )
}

export default IndexPage
