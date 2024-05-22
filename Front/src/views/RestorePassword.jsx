import React from 'react'
import logo from '../assets/logo.png'

export const RestorePassword = () => {

    return (
        <section className="w-5/6 flex mx-auto">
            <div
                className="w-1/2 px-20 py-10 mx-auto flex flex-col gap-2"
            >
                <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-2 ">
                    <img className="w-20" src={logo} alt="" />
                    <h2 className="font-semibold text-2xl">
                        Restablecer Contraseña
                    </h2>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" " required />
                    <label
                        htmlFor="email" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                        Email
                    </label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                        placeholder=" " required
                    />
                    <label
                        htmlFor="password" className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20">
                        Nueva contraseña
                    </label>
                </div>
                <h2 className="text-l text-gray-500 mb-5 mx-auto">
                    Iniciar sesión con GitHub
                </h2>
                <button 
                    className="btns mx-auto">
                    Restablecer Contraseña
                </button>
            </div>
            <div id='containerLog' className="w-1/2 ">
            </div>
        </section>
    )
}
