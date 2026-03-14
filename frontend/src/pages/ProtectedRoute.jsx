import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const verify = async ()=>{
        try {
            const res = await axios.get('https://book-store-api-phtz.onrender.com/auth', { withCredentials: true })
                setLoading(false);
        } catch (error) {
            navigate('/',{replace : true});
            console.log(error.response.data.message);
        }
    }
    verify();
  }, []);
  if(loading) {
    return <p>loading...</p>
  }
  else return children;
};
export default ProtectedRoute;
