import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Delete from './pages/Delete'
import Update from './pages/Update'
import Read from './pages/Read'
import Login from './pages/Login'
import User_creating from './pages/User_creating'
import ProtectedRoute from './pages/ProtectedRoute';
//import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>          
      <Routes>
      <Route path='/' element = {<Login/>}></Route>
      <Route path='/create_user' element= {<User_creating/>}></Route>
      <Route path='/home' element={ <ProtectedRoute> <Home/> </ProtectedRoute>}></Route>
      <Route path='/books/create' element = { <ProtectedRoute> <Create/> </ProtectedRoute>}></Route>
      <Route path='/books/show' element = {<ProtectedRoute> <Read/> </ProtectedRoute>}></Route>
      <Route path='/books/delete/:id' element = {<ProtectedRoute> <Delete/> </ProtectedRoute>}></Route>
      <Route path='/books/update/:id' element = {<ProtectedRoute> <Update/> </ProtectedRoute>}></Route>
      </Routes>
    </>
   
  )
}

export default App
