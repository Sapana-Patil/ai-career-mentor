import { useState } from 'react'
import AppRoutes from './app.route'
import './index.css'
import { AuthProvider } from './features/auth/context/auth.context'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

