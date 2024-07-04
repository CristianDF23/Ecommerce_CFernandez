import { Modal } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { AlertBasic } from '../../../components/Alerts';
import { findDocument, handleUpdateRol } from '../services/listUsers.services'
import { IconCheck2, IconX } from '../../../assets/Icons';
import { UserContext } from '../../../context/userContext';
import { handleUpdateUser } from '../../User/services/infoUser.services';

const ModalDetailUser = ({ setOpenModal, openModal, getUser, setGetUser }) => {
    const { userInformation, setUserInformation } = useContext(UserContext)
    const [openAlert, setOpenAlert] = useState(false);
    const documets = findDocument(getUser)

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <div className='border rounded-none bg-white'>
                {openAlert === false ? (
                    <>
                        <header className='h-16 flex justify-between items-center border border-transparent border-b-gray-400'>
                            <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>{getUser.first_name}</h2>
                            <button type='button' onClick={() => setOpenModal(false)} className="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                        </header>
                        <Modal.Body>
                            <section className='w-full flex justify-between items-start gap-6'>
                                <div className='w-1/2 flex flex-col justify-start py-5'>
                                    <h2 className='text-l text-center font-semibold text-gray-900'>Datos de usuario</h2>
                                    <ul className='flex flex-col gap-3 mt-1'>
                                        <ol className='py-3'><span className='font-semibold'>EMAIL:</span> {getUser.email}</ol>
                                        <ol className='py-3'><span className='font-semibold'>NOMBRE:</span> {getUser.first_name}</ol>
                                        <ol className='py-3'><span className='font-semibold'>APELLIDO:</span> {getUser.last_name}</ol>
                                        <ol className='py-3'><span className='font-semibold'>TELEFONO:</span> {getUser.phone}</ol>
                                        <ol className='py-3'><span className='font-semibold'>EDAD:</span> {getUser.age} Años</ol>
                                    </ul>
                                </div>
                                <hr className='w-[1px] h-[350px] bg-black' />
                                <div className='w-1/2 flex flex-col justify-start py-5'>
                                    <h2 className='text-l text-center font-semibold text-gray-900'>Documentación</h2>
                                    <ul className='flex flex-col gap-3'>
                                        <ol className='py-3 flex gap-4 items-center'>{documets.identificacion ? <span><IconCheck2 /></span> : <span><IconX /></span>}Identificacion</ol>
                                        <ol className='py-3 flex gap-4 items-center'>{documets.comprobanteDomicilio ? <span><IconCheck2 /></span> : <span><IconX /></span>}Comprobante de domicilio</ol>
                                        <ol className='py-3 flex gap-4 items-center'>{documets.comprobanteEstadoCuenta ? <span><IconCheck2 /></span> : <span><IconX /></span>}Comprobante de estado de cuenta</ol>
                                    </ul>
                                </div>
                            </section>
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                getUser.rol == 'Premium' ? <button className='btns mx-auto -mt-3' onClick={() => { handleUpdateUser(getUser, { rol: 'Usuario' }, setOpenModal, setUserInformation, setOpenAlert); setGetUser(false) }}>ASIGNAR ROL USUARIO</button> :
                                    <button className='btns mx-auto -mt-3' onClick={() => handleUpdateRol(getUser, userInformation, setOpenAlert, setGetUser, setOpenModal)}>ASIGNAR ROL PREMIUM</button>
                            }
                        </Modal.Footer>
                    </>
                ) : (
                    <>
                        {openAlert === 'error' && <AlertBasic color={'warning'} text={`El usuario no cuenta con toda la documentación`} />}
                        {openAlert === 'success' && <AlertBasic color={'success'} text={`Rol modificado correctamente`} />}
                    </>
                )}
            </div>
        </Modal>
    );
}

export default ModalDetailUser