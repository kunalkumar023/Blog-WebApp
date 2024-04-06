import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Header from './Components/Header'
import Addcategory from './Pages/Addcategory'
import Addblog from './Pages/Addblog'
import ProtectedRoutes from './services/ProtectedRoutes'
import SingleBlog from './Pages/SingleBlog'
function App() {
  return (
    <>
    <Header/>
    <Routes>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={< ProtectedRoutes/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-category' element={<Addcategory/>}/>
      <Route path='/add-blog' element={<Addblog/>}/>
      <Route path="/get/blog/:id" element={<SingleBlog/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App;