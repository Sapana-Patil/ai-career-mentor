import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'

const Protected = ({children}) => {
    const{loading,user}=useAuth()
    if(loading){
               return (<main className="min-h-screen bg-gray-950 flex items-center justify-center px-4"><h1 className="text-3xl font-bold text-white">Loading...</h1></main>)
    }
    if(!user){
      return  <Navigate to={'/login'}/>
    }
  return children
}

export default Protected