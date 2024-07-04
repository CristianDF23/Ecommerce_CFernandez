import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/userContext'
import { AlertBasic } from '../../../components/Alerts'
import { handleUpdateUser } from '../services/infoUser.services'
import { Modal } from 'flowbite-react'

const ModalUpdateData = ({formData, setOpenModal, openModal, handleInputChange}) => {
    const [openAlert, setOpenAlert] = useState(false)
    const { userInformation, setUserInformation } = useContext(UserContext)

    return (
        <Modal id='modal' dismissible show={openModal}>
            <div className='border rounded-none bg-white'>
                <header className='h-16 flex justify-between items-center'>
                    <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>EDITAR TUS DATOS</h2>
                    <button type='button' onClick={() => setOpenModal(false)} class="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                </header>
                <hr />
                {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al actualizar el usuario'} />}
                {openAlert === 'success' && <AlertBasic color={'success'} text={'Usuario actualizado correctamente'} />}
                <Modal.Body>
                    <div className="p-4 md:p-5 space-y-4">
                        <section className="mt-5 flex flex-col gap-2">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="email" id="email"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder={userInformation.email} value={formData.email}
                                    onChange={handleInputChange} />
                                <label htmlFor="email"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Email
                                </label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="first_name" id="first_name"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={userInformation.first_name} value={formData.first_name}
                                        onChange={handleInputChange} />
                                    <label htmlFor="first_name"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Nombre</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="last_name" id="last_name"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={userInformation.last_name} value={formData.last_name}
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
                                        placeholder={userInformation.phone} value={formData.phone}
                                        onChange={handleInputChange} />
                                    <label htmlFor="phone"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Teléfono</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="age" id="age"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={userInformation.age} value={formData.age}
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
                    <button id="updateUser" onClick={() => handleUpdateUser(userInformation, formData, setOpenModal, setUserInformation, setOpenAlert)} className="mx-auto btns">ACTUALIZAR DATOS</button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default ModalUpdateData