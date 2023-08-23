import React, {useState, useEffect, useContext} from 'react'
import AdminMenu from '../components/AdminMenu'
import FilesMenu from '../components/FilesMenu'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const SchoolsPage = () => {
  const {id, token, role} = useParams();
  const [datx, setDatx] = useState([]);
  const [schoolname, setSchoolname] = useState('');
  const [schoolocation, setSchoolocation] = useState('');
  const [schoolevel, setSchoolevel] = useState('');
  const [schooladded, setSchooladded] = useState('');


  const getall = async()=>{
    try{

        const {data} = await axios.post('/rep/allschool', {
            user_id: id
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          })
          setDatx(data);

    }catch(e){
        console.log(e);
    }
  }

  const onchangeHandler=(e)=>{

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    setSchoolevel(option);
    console.log(option);

}
const Addschool = async(e)=>{
     e.preventDefault();
     try{
        setSchooladded('');
        const {data} = await axios.post('/rep/addschool', {
            user_id: id,
            school_name: schoolname,
            school_level: schoolevel,
            school_location: schoolocation
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          } );

          setDatx(prev=>[...prev, data]);
          setSchooladded('School added successful');
          setSchoolname('');
          setSchoolevel('');
          setSchoolocation('');

     }catch(e){
        console.log(e);
     }
}

 useEffect(()=>{
     if(!id){
        return;
     }
     getall();
 },[id])

  return (
    <div className='flex flex-row px-4 mt-8'>
        <div className='flex mr-2 flex-col w-[320px] h-[220px]'>
          <AdminMenu id={id} token={token} role={role} />
            </div>

        <div className=' flex flex-row w-[780px] h-[440px]'>
           <div className="flex flex-col w-1/2 m-2 p-2 border-r border-blue-500">
            <h1 className="text-lg underline font-semibold ">Schools</h1>
            {datx && (<>
                 {datx.map(dat=>(
                    <Link to={`/admin/schools/school/${id}/${token}/${role}/${dat._id}`} className='flex flex-row m-2 p-1 gap-2 hover:bg-blue-700 bg-blue-400 text-white' key={dat._id}>
                         <h1 >{dat.school_name}</h1>
                         <h1 >{dat.school_location}</h1>
                    </Link>
                 ))}
            </>)}
            </div>
           <div className="flex flex-col w-1/2 m-2 p-2"> <h1 className="text-lg underline font-semibold"> Add school</h1>
           <form className='flex flex-col p-2' onSubmit={Addschool}>
            {schooladded && (
                <h1 className='text-sm font-semibold text-red-500'>{schooladded}</h1>
            )}
           <input type="text" placeholder='Enter School name ' required value={schoolname} onChange={e=>setSchoolname(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           
           <select onChange={onchangeHandler} type="text"  className='border-b border-blue-500  m-3 px-3 '>
           
            <option>--Select Level--</option>
            <option id={'PreSchool'} >PreSchool</option>
            <option id={'Primary'} >Primary</option>
            <option id={'Secondary'} >Secondary</option>
            <option id={'Senior'} >Senior</option>
            <option id={'University'} >University</option>
            <option id={'Collegue'} >Collegue</option>
          
           </select>
           <input type="text" placeholder='School Location' required value={schoolocation} onChange={e=>setSchoolocation(e.target.value)}  className=' border-blue-500 border-b m-3 px-3' />
           <div className="flex flex-row justify-between">
            <p>Ask me!</p>
           <button type='submit' className='border rounded-full px-3 hover:text-white bg-blue-500'>Add</button>
           
           </div>
        </form>
           </div>
        </div>

    </div>
  )
}

export default SchoolsPage