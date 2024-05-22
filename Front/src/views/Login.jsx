import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import logo from '../assets/logo.png';
import axios from 'axios'
import Swal from 'sweetalert2'


export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserLog } = useContext(UserContext)
    const [count, setCount] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000
            });
            Toast.fire({
                icon: "success",
                title: "Inicio de sesión exitoso"
            });
            setUserLog(response.data);
            localStorage.setItem("userLog", JSON.stringify(response.data));
            setTimeout(() => {
                response.data.rol == 'Usuario' ? navigate('/profile') : navigate('/admin')
            }, 2000)

        } catch (error) {
            setCount(() => count + 1)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000
            });
            Toast.fire({
                icon: "error",
                title: count <= 3 ? `${error.response.data.Error}. Intento ${count}/3` : `Restablezca su contraseña o intente nuevamente mas tarde`
            });
        }
    }

    return (
        <section className="w-5/6 flex mx-auto">
            <form onSubmit={handleSubmit} className="w-1/2 px-20 py-10 mx-auto flex flex-col gap-2">
                <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-2 ">
                    <img className="w-20" src={logo} alt="" />
                    <h2 className="font-semibold text-2xl">
                        Inicia sesión en tu cuenta
                    </h2>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" " required={true} />
                    <label
                        htmlFor="email" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                        Email
                    </label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" " required={true} />
                    <label
                        htmlFor="password" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                        Contraseña
                    </label>
                </div>
                <h2 className="text-l text-gray-500 mb-5 mx-auto">
                    Iniciar sesión con GitHub
                </h2>
                <a
                    href="http://localhost:8080/api/auth/callbackGithub"
                    className="githubBrand mx-auto p-3 cursor-pointer">
                    <svg className="w-[46px] h-[46px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
                <div className="text-center mx-auto flex flex-col gap-2">
                    <h2 className="text-l text-gray-500 mb-5">
                        No estas registrado?
                    </h2>
                    <Link to="/register"
                        className="text-l text-gray-800 hover:text-gray-300">
                        Crear Cuenta
                    </Link>
                    {count > 4 ? (
                        <Link to="/restorePass"
                            className="text-l text-gray-800 hover:text-gray-300 mt-5">
                            Restablecer Contraseña
                        </Link>
                    ) : <div></div>
                    }
                </div>
                <button type='submit'
                    className="btns mx-auto">
                    Iniciar Sesión
                </button>
            </form>
            <div id='containerLog' className="w-1/2 ">
            </div>
        </section>
    );

}
