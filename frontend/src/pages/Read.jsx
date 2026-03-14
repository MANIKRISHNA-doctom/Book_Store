import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
//import { toast } from 'react-toastify';
const Read = () => {
  const [books,setBooks] = useState([]);
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');
  const [remove,setRemove] = useState('');
  const [loading,setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [access,setAccess] = useState('');
  useEffect( ()=>{
    if(location.state?.t === 'deleted'){
      setRemove('Book deleted successfully')
    }
    else if(location.state?.t === 'updated') {
     setSuccess('Book updated successfully')
    }
    //window.history.replaceState({}, document.title);
  },[]);
   // setSuccess(location.state?.message);
   useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"));
        setAccess(token.access);
        console.log(access);
        const getbooks = async()=>{
       try {
        const res = await axios.get('https://book-store-api-phtz.onrender.com/books',{withCredentials : true});
        setBooks(res.data);
        setLoading(false);
       } catch (error) {
        if(!error.response)
        console.log(error.message);
        setError(error.response.data.message);
        setLoading(false);
      }
    }
      getbooks();
  },[]);
  return (
    <>
    <div>
      {error && <p>error is {error}</p> }
      <p className='text-red-600'>{remove}</p>
      {loading ? (<p>Loading...</p>) : books.length === 0 ? <p>no book is found</p> : books.map(book => (
      <div className= 'border-2 ' key={book._id} >
          <p>Title : {book.title}</p>
          <p>Author : {book.author}</p>
          <p>Publishyear : {book.publishYear}</p>
          <div className=''>
            <div className='inline-block mr-2'>
              <Link to={`/books/delete/${book._id}`}>
              <button className='border-2 border-[#adb5bd] rounded-lg bg-[#d90429] hover:bg-[#f08080]'>delete</button>
            </Link>
            </div>
            <div className='inline-block'>
              <Link to={`/books/update/${book._id}`}>
              <button className='border-2 border-[#adb5bd] rounded-lg bg-[#847577] hover:bg-[#e5e6e4]'>edit</button>
            </Link>
            </div>
          </div>
          <p className='text-green-600'>{success}</p>
      </div>
     ))
    }
    </div>
    <div className=' p-2 flex flex-row justify-center border-b-2  '>
      <Link to = '/home ' state={{access : access}}>
        <button className='border-2 rounded-sm hover:bg-black hover:text-white'>HOME</button>
      </Link>
    </div>
    </>
  )
}

export default Read
