import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const { loading, handleRegister } = useAuth()
    const navigate=useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/home')
    }
    if (loading) {
        return (<main className="min-h-screen bg-gray-950 flex items-center justify-center px-4"><h1 className="text-3xl font-bold text-white">Loading...</h1></main>)
    }
    return (
        <main> <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md ">

                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">AI Career Mentor</h1>
                    <p className="text-gray-400 mt-2">Your personal interview preparation assistant</p>
                </div>

                {/* Card */}
                <div className=" rounded-2xl p-8 shadow-xl border border-gray-900">
                    <h2 className="text-2xl font-semibold text-white mb-6 " >Registeration</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* User name  */}
                        <div>
                            <label className="block text-sm text-gray-100 mb-1">Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                className="w-full bg-gray-300 text-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white placeholder-gray-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-100 mb-1">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-gray-300 text-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white placeholder-gray-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-100 mb-1">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-300 text-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white placeholder-gray-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-700 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2"
                        >
                            Register
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="text-gray-400 text-sm text-center mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-pink-400 hover:text-pink-300">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
        </main>
    )
}


export default Register