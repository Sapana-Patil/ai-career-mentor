import { useContext,useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register, logout,getMe } from '../services/auth.api'

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (error) {
           
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        }
        catch (error) {
            console.log("Unknown error")
        }
        finally {
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
        }
        catch (error) {

        }
        finally {
            setLoading(false)
        }
    }
     useEffect(()=>{
        const getAndSetUSer=async()=>{
            const data=await getMe()
            setUser(data.user)
            setLoading(false)
        }

        getAndSetUSer()
    },[])

    return { user, loading, handleLogin, handleRegister, handleLogout }
}