import React, { useContext, useState } from 'react'
import { Modal } from "flowbite-react";
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import Swal from 'sweetalert2'

export const InfoUser = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);
    const { setUserLog } = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        age: user.age,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/auth/${user._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: `Datos Actualizados`
            });
            setUserLog(response.data)
            setOpenModal(false);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <section className="w-full">
            <section className="flex flex-col w-1/2 mx-auto mt-10">
                <h2 className="text-3xl font-semibold mb-10">MIS DATOS</h2>
                <h2 className="text-3xl font-semibold mb-4">DETALLES</h2>

                <div className="flex flex-col gap-3">
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">NOMBRE</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${user.first_name} ${user.last_name}`}
                        </dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">EMAIL</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">CELULAR</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">EDAD</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.age} AÑOS</dd>
                    </div>
                </div>
                <>
                    <button className='mt-4 text-l font-semibold hover:bg-black hover:text-white w-fit' onClick={() => setOpenModal(true)}>ACTUALIZAR DATOS</button>
                    <Modal id='modal' dismissible show={openModal}>
                        <div className='border rounded-none bg-white'>
                            <header className='h-16 flex justify-between items-center'>
                                <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>EDITAR TUS DATOS</h2>
                                <button type='button'onClick={() => setOpenModal(false)} class="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                            </header>
                            <hr />
                            <Modal.Body>
                                <div className="p-4 md:p-5 space-y-4">
                                    <section className="mt-5 flex flex-col gap-2">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="email" name="email" id="email"
                                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                                placeholder={user.email} value={formData.email}
                                                onChange={handleInputChange} />
                                            <label htmlFor="email"
                                                className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Email
                                            </label>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="first_name" id="first_name"
                                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                                    placeholder={user.first_name} value={formData.first_name}
                                                    onChange={handleInputChange} />
                                                <label htmlFor="first_name"
                                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                                    Nombre</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="last_name" id="last_name"
                                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                                    placeholder={user.last_name} value={formData.last_name}
                                                    onChange={handleInputChange} />
                                                <label htmlFor="last_name"
                                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                                    Apellido</label>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="tel" name="phone" id="phone"
                                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                                    placeholder={user.phone} value={formData.phone}
                                                    onChange={handleInputChange} />
                                                <label htmlFor="phone"
                                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                                    Teléfono</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="age" id="age"
                                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                                    placeholder={user.age} value={formData.age}
                                                    onChange={handleInputChange} />
                                                <label htmlFor="age"
                                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Edad
                                                </label>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button id="updateUser" onClick={handleUpdateUser} className="mx-auto btns">ACTUALIZAR DATOS</button>
                            </Modal.Footer>
                        </div>
                    </Modal>
                </>
            </section>
        </section>
    )
}
