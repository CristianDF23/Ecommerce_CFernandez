import { useState } from 'react';
import logo from '../../assets/logo.png'
import { handleRegister, newUser } from './services/register.services';
import { AlertBasic } from '../../components/Alerts';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [passwordVal, setPasswordVal] = useState('')
    const [formData, setFormData] = useState(newUser);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister(formData, setOpenAlert, passwordVal, navigate)
    }

    return (
            <section className="w-5/6 flex flex-row-reverse mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2 px-5 py-10 mx-auto flex flex-col gap-2">
                    <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-2">
                        <img className="w-20" src={logo} alt="Logo" />
                        <h2 className="font-semibold text-2xl">Crear Nueva Cuenta</h2>
                    </div>
                    {openAlert === 'password' && <AlertBasic color={'warning'} text={'Las contraseñas no coinciden'}/>}
                    {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al registrar el usuario'}/>}
                    {openAlert === 'success' && <AlertBasic color={'success'} text={'Usuario registrado correctamente'}/>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                            Contraseña
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="passwordVal"
                            id="passwordVal"
                            className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                            placeholder=" "
                            value={passwordVal}
                            onChange={(e) => setPasswordVal(e.target.value)}
                            required
                        />
                        <label htmlFor="passwordVal" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                            Confirmar Contraseña
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                placeholder=" "
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="first_name" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                                Nombre
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                placeholder=" "
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="last_name" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                                Apellido
                            </label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                placeholder=" "
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="phone" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                                Teléfono
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="age"
                                id="age"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                placeholder=" "
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="age" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                                Edad
                            </label>
                        </div>
                    </div>
                    <h2 className="text-l text-gray-500 mb-5 mx-auto">Registrate con GitHub</h2>
                    <a href="http://localhost:8080/api/auth/callbackGithub" className="githubBrand mx-auto p-3 cursor-pointer">
                        <svg className="w-[46px] h-[46px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                    <button id="register" type="submit" className="mx-auto btns">
                        Crear Cuenta
                    </button>
                </form>
                <div id="containerReg" className="w-1/2"></div>
            </section>
    );
}