import axios from "axios";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'
import { Modal } from "flowbite-react";

export const LogOut = () => {
    const [openModal, setOpenModal] = useState(false);
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
            setOpenModal(true)
            setTimeout(() => {
                setUserLog(null)
                localStorage.removeItem("userLog");
                setOpenModal(false)
            }, 3000)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={handleSubmit} className="text-white hover:text-gray-400 mr-10">
                Cerrar Sesión
            </button>
            <Modal dismissible show={openModal}>
                <div className="bg-white border-none rounded-none">
                    <Modal.Body>
                        <h2 className="font-semibold text-3xl text-center">GRACIAS POR TU VISITA!</h2>
                    </Modal.Body>
                </div>
            </Modal>
        </>
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