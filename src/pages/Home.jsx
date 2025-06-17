import React from 'react'
import AddTodo from '../components/AddTodo'
import LoadItems from '../components/LoadItems'
import TodoItems from '../components/TodoItems'
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';   


const Home = () => {
  
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);



  return (
   
      <>
      <AddTodo />
      <LoadItems/>
      <TodoItems />
      </>
    
  )
}

export default Home