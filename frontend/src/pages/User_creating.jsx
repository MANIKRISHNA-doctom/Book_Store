import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const User_creating = () => {
  const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const [access,setAccess] = useState('student');
    const submit = async (e)=> {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5555/books/create_user`,{
      username,
      password,
      access
      });
      setMessage('User created successfully ');
      setError('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setUsername('');
      setPassword('');
      setMessage('');
    }
    }
  return (
    <div className='h-screen flex justify-center align-center'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <form onSubmit={submit} className='flex flex-col w-sm gap-2 rounded border-2 border-[#8e9aaf]'>
        <div className='m-2 flex flex-col'>
            <label htmlFor="name"> Create Username</label>
            <input type="text" id='name'  value={username} className='border-2 rounded-sm border-[#e5e5e5]' onChange={(e)=>{setUsername(e.target.value)}} /> 
        </div>
        <div className='m-2 flex flex-col'>
            <label htmlFor="password"> Create Password</label>
            <input type="password" id='password' value={password} className='border-2 rounded-sm border-[#e5e5e5]' onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div >
            <select name="access" value = {access} onChange ={(e)=> setAccess(e.target.value)} className='border-2 rounded ml-2 '>
                <option value="student" >Student</option>
                <option value="library">Library Member</option>
            </select>
        </div>
        <button type='submit' className='border-2 bg-blue-600 text-white m-2 rounded'>Submit</button>
       </form>
      {message &&
       <div className='mt-2'>
        <p>{message}</p>
        <Link to='/'>
          <button className='text-[#48cae4] underline hover:text-[#0077b6]'>Sign in</button>
        </Link>
       </div> }
       {error && <p>{error}</p>}
    </div>
    </div>
    
  )
}

export default User_creating
