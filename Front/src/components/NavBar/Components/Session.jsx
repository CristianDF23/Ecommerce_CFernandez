import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogOut } from "../services/navbar.services";
import ModalLogout from "./ModalLogout";
import { UserContext } from "../../../context/userContext";

export const LogOut = () => {
    const [openModal, setOpenModal] = useState(false);
    const { userInformation, setUserInformation } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
            <button onClick={() => handleLogOut(setOpenModal, userInformation.email, navigate, setUserInformation)} className="text-white hover:text-gray-400 mr-10">
                Cerrar Sesión
            </button>
            <ModalLogout openModal={openModal} />
        </>
    )
}

export const LogAndRegister = () => {
    return (
        <div className="flex gap-4 mr-10">
            <Link to={'/api/v1/register'}
                className="text-white hover:text-gray-400">
                Crear Cuenta
            </Link>
            <p className="text-white">|</p>
            <Link to={'/api/v1/login'} className="text-white hover:text-gray-400">
                Iniciar Sesión
            </Link>
        </div>
    )
}