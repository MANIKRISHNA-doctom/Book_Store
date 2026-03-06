import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  //const location = useLocation();
    const submit = async (e)=> {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5555/books/user_ver`,{
      username,
      password,
    }, {
      withCredentials: true
});
    if(res.data.success) {
      navigate('/home',{
        state : {
            access : res.data.access
        }
      });
    }
    } catch (error) {
      setPassword('');
      setUsername('');
      if(!error.response){
        setMessage(error.message);
      }
      else
      setMessage(error.response.data.message);
    }
  }
   
  return (
    <div className=' flex justify-center items-center h-screen'>
      <div className='flex flex-col'>
        <form onSubmit={submit} className='flex flex-col w-sm gap-4 rounded border-2 border-[#8e9aaf]'>
        <div className='mx-2 flex flex-col'>
            <label htmlFor="name">Username</label>
            <input type="text" id='name'  value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-2 rounded-sm border-[#e5e5e5]'  /> 
        </div>
        <div className='mx-2 flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='border-2 rounded-sm border-[#e5e5e5]' />
        </div>
        <button type='submit' className='border-2 bg-blue-600 text-white m-2 rounded'>Sign in</button>
        </form>
        {message && <p>{message}</p>}
        <div className='mt-2 mx-2'>
          <Link to= '/create_user'>
            <button className='underline text-[#d4a373] '> Sign Up </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login
