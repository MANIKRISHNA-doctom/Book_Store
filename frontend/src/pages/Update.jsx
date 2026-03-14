import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
const Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [error,setError]  = useState('');
  const [title,settitle] = useState('');
  const [author,setauthor] = useState('');
  const [year,setyear] = useState('');
  const onsubmit = async(e)=>{
    e.preventDefault();
    try {
       await axios.put(`https://book-store-api-phtz.onrender.com/books/${id}`,{
        title : title,
        author: author,
        publishYear: year
       }, {withCredentials: true});
       navigate('/books/show',{
        state : {
          t : 'updated'
        }
       });
    } catch (error) {
      if(!error.response){
        setError(error.message);
      }
      console.error('error is',error.response.data.message);
      setError(error.response.data.message);
    }
  };
  useEffect(()=>{
      const edit = async ()=>{
        try {
          const res = await axios.get(`http://localhost:5555/books/${id}`);
          const book = res.data;
          settitle(book.title);
          setauthor(book.author);
          setyear(book.publishYear);
          console.log(res);
        } catch (error) {
          setError(error.message);
        }
      }
      edit();
  },[]);
  return (
    <div>
      <form onSubmit={onsubmit} className='flex flex-col'>
        <label htmlFor="title">Title of the book</label>
      <input type="text" id="title" placeholder='enter' onChange={(e)=>{settitle(e.target.value)}}value = {title} className='bg-[#ccd5ae] text-[#ffffff]' />
      <label htmlFor="author">Name of the author</label>
      <input type="text" id='author'  value= {author} onChange={(e)=>{setauthor(e.target.value)}} className='border-[#d4a373] border-2'/>
      <label htmlFor="year">Enter published year</label>
      <input type="text" id='year' value={year} onChange={(e)=>setyear(e.target.value)} className='border-[#d4a373] border-2'/>
      <button className='border-1 mt-1 bg-[#1b263b] text-white w-24 rounded-lg hover:bg-[#415a77] '>SUBMIT</button>
      </form>
    {error && <p>error is {error}</p>}
    </div>
  )
}

export default Update
