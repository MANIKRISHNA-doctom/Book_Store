import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect,useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import store_logo from "../assets/store_logo.jpeg"
const Home = () => {
  const [search,setSearch] = useState('');
  const [books,setBooks] = useState([]);
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const access = location.state?.access;
  const college = location.state?.college;
  const logout = async ()=>{
    try {
     const log =await axios.get('http://localhost:5555/books/logout',{withCredentials : true});
      navigate('/');
    } catch (error) {
      if(!error.response){
        setError(error.message);
      }
      console.error('error is',error.response.data.message);
      setError(error.response.data.message);
    }
  }
  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      try {
        if(!search.trim()){
          setBooks([]);
          return;
        }
        const res = await axios.get(`http://localhost:5555/books/search/${search}`,{
          withCredentials : true
        });
        setBooks(res.data);
      } catch (error) {
        console.log(error.message);
      }
    },300);
    return () => clearTimeout(timer);
  },[search]);
  return (
   <>
    <div className='h-15 w-full bg-[#caf0f8] flex justify-between items-center' >
      {access == 'library' && (<Link to = '/books/Create'>
        <button className='bg-[#00b4d8] text-white border rounded mr-2 hover:bg-[#0077b6]'> add book</button>
      </Link>)}
      <img src={store_logo} alt = "Book Store" className='h-15 object-contain'></img>
      <button className='border-2 text-white rounded-sm py-0 mr-2 bg-[#ef233c] hover:bg-[#a4133c]' onClick={logout}>logout</button>
    </div>
    <div className='flex justify-center mt-10'> 
      <Link to='/books/show'>
      <button className='border-b-2 text-blue-900 hover:text-blue-600'>Books list </button>
      </Link>
      </div>
      <div className='flex flex-row justify-center mt-10 '>
        <input type="text" placeholder='search' name = 'search' value={search} className='border-2 px-2 border-[#e5e5e5] rounded-lg mx-2' onChange={(e)=>{setSearch(e.target.value)}} /> 
      </div>
      <div className='ml-3'>
        {books.map((book)=>(
           <div key={book._id} className=' border-2 rounded-sm m-1'>
            <p className='inline-block m-2'>{book.title}</p>
            <p className='inline-block m-2'>{book.author}</p>
            <p className='inline-block m-2'>{book.publishYear}</p>
            <p>avaliable {}</p>   
           </div>
        )
      )}
      </div>
      <p className='text-red-600'>{error}</p>
   </>
  )
}

export default Home
