import React, {useContext, useState} from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import NotificationContext from '../NotificationContext';
import axios from 'axios';

const Logout = ({refreshToken}) => {
    const {user, ready, setUser} = useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);
    //const {refreshToken} = user;
    const [redirect, setRedirect] = useState(null);
    //console.log(refreshToken)
    const logout = async()=>{
        try{
          const data = await axios.post('/user/logout', {refreshToken: refreshToken},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          });
          notificationHandler({type:'warning', message:'Logout success...Next time'});
            setRedirect('/');
           // setUser(null);
        }catch(e){
          console.log(e);
        }
    }
    if(redirect){
       return <Navigate to={redirect} />
    }
  return (
    <>
    <button onClick={logout} className='border-b border-blue-500 hover:text-white hover:bg-blue-500 max-w-full p-2 mt-1 flex items-center justify-center' >Logout</button>
    </>
  )
}

export default Logout