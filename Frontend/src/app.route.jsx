import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/auth/pages/Home'
import Protected from './features/auth/components/Protected'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/home" element={<Protected><Home/></Protected>} /> 
    </Routes>
  )
}

export default AppRoutes