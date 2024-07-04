import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertBasic } from '../../components/Alerts';
import { handleRestorePassword } from './services/restorePassword.services';

export const RestorePassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const email = localStorage.getItem('userEmail')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRestorePassword(token, password, confirmPassword, email, setOpenAlert, navigate)
    }

    return (
        <section className="w-5/6 flex mx-auto">
            <form onSubmit={handleSubmit} className="w-1/2 px-20 py-10 mx-auto flex flex-col gap-2">
                <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-2 ">
                    <img className="w-20" src={logo} alt="" />
                    <h2 className="font-semibold text-2xl">
                        Restablecer Contraseña
                    </h2>
                </div>
                {openAlert === 'info' && <AlertBasic color={'info'} text={'Las contraseñas no coinciden'} />}
                {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al restablecer la contraseña'} />}
                {openAlert === 'success' && <AlertBasic color={'success'} text={'Contraseña restablecida correctamente'} />}
                <div className="relative z-0 w-full mb-10 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="password"
                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20"
                    >
                        Nueva contraseña
                    </label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20"
                    >
                        Confirmar contraseña
                    </label>
                </div>
                <button type="submit" className="btns mx-auto">
                    Restablecer Contraseña
                </button>
            </form>
            <div id='containerPass' className="w-1/2"></div>
        </section>
    );
};