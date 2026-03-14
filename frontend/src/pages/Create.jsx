import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Create = () => {
  const [title,settitle] = useState('');
  const [author,setauthor] = useState('');
  const [year,setyear] = useState('');
  const [access,setAccess] = useState('');
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const onsubmit = async(e)=>{
    e.preventDefault();
    try {
       const res = await axios.post("https://book-store-api-phtz.onrender.com/books",{
        title : title,
        author: author,
        publishYear: year
       },{
        withCredentials: true
       });
       setMessage('Book created successfully');
       setError('');
       settitle('');
       setauthor('');
       setyear('');
    } catch (error) {
      //console.error('error is',error.message);
      //setError(error.message);
      if(!error.response){
        setMessage(error.message);
      }
      else
      setMessage(error.response.data.message);
      setMessage('');
    }
  };
 useEffect(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
 // const decoded = jwtDecode(stored.token);
    setAccess(token.access);
  }, []);
  return (
    <>
  <div className=' h-screen flex flex-col justify-center items-center'>
    <div className="flex justify-center flex-col p-2 border-b-red-900">
      <form onSubmit={onsubmit} className='flex flex-col border-2 p-2 rounded-sm border-[#]'>
        <label htmlFor="title">Title of the book</label>
      <input type="text" id="title"  onChange={(e)=>{settitle(e.target.value)}}value = {title} className='border-[#d4a373] border-2' />
      <label htmlFor="author">Name of the author</label>
      <input type="text" id='author'  value= {author} onChange={(e)=>{setauthor(e.target.value)}} className='border-[#d4a373] border-2'/>
      <label htmlFor="year">Enter published year</label>
      <input type="text" id='year' value={year} onChange={(e)=>setyear(e.target.value)} className='border-[#d4a373] border-2'/>
      <button className='border-1 mt-1 bg-[#1b263b] text-white w-24 rounded-lg hover:bg-[#415a77] '>SUBMIT</button>
      </form>
      {message && <p className='text-[#55a630]'>{message}</p>}
      {error && <p>{error}</p>}
    </div>
    <div className='mt-2 flex justify-center  '>
      <Link to = '/home' state={{ access: access }} className='nav-link'>
      <button className='border-2 rounded-sm hover:border-[#d4a373]'>Home</button>
      </Link>
    </div>
  </div>
    </>
  );
};

export default Create
