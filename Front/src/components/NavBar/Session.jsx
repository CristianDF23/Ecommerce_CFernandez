import axios from "axios";
import {React, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'

export const LogOut = () => {
    const { setUserLog } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const logout = await axios.get("http://localhost:8080/api/auth/logout", {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setUserLog(null)
            localStorage.removeItem("userLog");
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleSubmit} className="text-white hover:text-gray-400 mr-10">
            Cerrar Sesión
        </button>
    )
}

export const LogAndRegister = () => {
    return (
        <div className="flex gap-4 mr-10">
            <Link to={'/register'}
                className="text-white hover:text-gray-400">
                Crear Cuenta
            </Link>
            <p className="text-white">|</p>
            <Link to={'/login'} className="text-white hover:text-gray-400">
                Iniciar Sesión
            </Link>
        </div>
    )
}