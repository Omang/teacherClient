import React, {useState, useEffect, useContext} from 'react'
import TeacherMenu from './TeacherMenu'
import { useParams } from 'react-router-dom'
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import NotificationContext from "../NotificationContext";

const TeacherApps = () => {
  const {id, token, role} = useParams();
  const [datax, setDatax] = useState('');
  const [subject, setSubject] = useState('');
  const [ltype, setLtype] = useState('');
  const {notificationHandler} = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [err, setErr] = useState(false);
  const [payapp, setPayapp] = useState(false);
  const [cardname, setCardname] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [cardcvv, setCardcvv] = useState('');


  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setLtype(option);
    console.log(option);

}
const newApp = async(e)=>{
   e.preventDefault();
   setLoading(true)
   try{

    const {data} = await axios.post('/license/new',{
      user_id: id,
      license_type: ltype,
      license_amount: '100',
      license_subject: subject,
      license_duration: '10days'
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    setLoading(false);
    notificationHandler({type:'success', message:'Application created success...Pay now'});
    if(data.message === 'make payment'){
      setPayapp(true);
    }

   }catch(e){
    setLoading(false);
    console.log(e);
   }
}
  const checkapp = async()=>{
    try{
       const {data} = await axios.get('/license/getapp/'+id,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      if(data?.app_payment){
        setDatax(data);
      }else if(data?.license_type){
         setPayapp(true);
      }else{
         setDatax('');
      }
    }catch(e){
      console.log(e);
    }
  }
  const payNow = async(e)=>{
    e.preventDefault();
    try{
       const {data} = await axios.put('/license/payapplication',{
        user_id: id
       },{
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
    checkapp();
  },[id])
  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
        <TeacherMenu token={token} id={id} role={role} />
            </div>

        <div className=' flex flex-col w-[780px] h-[440px]'>
           {datax ? <>
             <div className="border border-blue-500 rounded-xl m-4 flex flex-col">
                 <h1 className="text-2xl font-semibold underline">License Type: {datax.license_type}</h1>
                 <h1 className="text-2xl font-semibold underline">License Duration: {datax.license_duration}</h1>
                 <h1 className="text-2xl font-semibold underline">License Subject: {datax.license_subject}</h1>
                 {datax.license_approve ? <><button>Approved Pay License</button> </>: <h1 className="text-2xl text-red-500 font-semibold underline">Waiting for approval</h1>}
             </div>
           </> : <>
           <div className=' flex ml-4  mt-8'>
           {payapp ? <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
           <form onSubmit={payNow}>
           <input type="text" placeholder='Enter card holder name' 
           required value={cardname} onChange={e=>setCardname(e.target.value)} 
            className=' border-blue-500 border-b m-3 px-3' />
            <input type="number" placeholder='Enter Card number' 
           required value={cardnumber} onChange={e=>setCardnumber(e.target.value)} 
            className=' border-blue-500 border-b m-3 px-3' />
            <input type="text" placeholder='Enter Card CVV' 
           required value={cardcvv} onChange={e=>setCardcvv(e.target.value)} 
            className=' border-blue-500 border-b m-3 px-3' /><br />
            <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Pay Now</button>
           </form>
           </div>: <div className=' border border-blue-500 rounded-2xl shadow-2xl w-[400px]'>
      <h1>License Application form</h1>
        {err && (<p className='ml-4 text-sm text-red-500 font-bold uppercase'>
          Something wrong happend! try again.
        </p>)}
        {loading ? <GridLoader color={'#7ED321'} loading={loading} size={20} /> : <form className='flex flex-col p-2' onSubmit={newApp}>
        <select onChange={onchangeHandler} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
           <option>--Select License Type--</option>
           <option id={'temporary'} >Temporary 10Pula</option>
           <option id={'permanent'} >Permanent 100Pula</option>
         
          </select>
           <input type="text" placeholder='Enter Subject to teach' required value={subject} onChange={e=>setSubject(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <div className="flex flex-row justify-between">
            <p>Ask me!</p>
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Submit</button>
           
           </div>
        </form>}
      </div>}
    </div>
           </>}
        </div>

    </div>
  )
}

export default TeacherApps