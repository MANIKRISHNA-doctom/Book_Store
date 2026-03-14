import React, { useEffect,useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Delete = () => {
  const [error,setError] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const del = async ()=>{
      try {
        await axios.delete(`https://book-store-backend-api-rsv8.onrender.com/books/${id}`,{withCredentials : true});
        navigate('/books/show',{
          state : {
            t : 'deleted'
            }
        });
      } catch (error) {
         if(!error.response){
          setError(error.message);
         }
        console.error('error is',error.response.data.message);
         setError(error.response.data.message);
      }
    }
     del();
  },[])
  return (
    <div>
      {error && <p>error is {error}</p>}
    </div>
  )
}

export default Delete
