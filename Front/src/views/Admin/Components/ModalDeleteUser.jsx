import React, { useContext, useState } from 'react';
import { Modal } from 'flowbite-react';
import { UserContext } from '../../../context/userContext';
import { handleDeleteUser } from '../services/listUsers.services';

const ModalDeleteUser = ({ openModal2, setOpenModal2, user, setGetUser }) => {
    const { userInformation, setCartInformation } = useContext(UserContext);

    return (
        <Modal dismissible show={openModal2} onClose={() => setOpenModal2(false)}>
            <div className='border rounded-none bg-white'>
                <>
                    <header className='h-auto py-4 flex-col flex justify-between items-center'>
                        <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>¿ESTÁ SEGURO?</h2>
                        <h3 className='text-2xl text-center w-full font-semibold text-gray-500 dark:text-white'>Esto eliminará el usuario de su lista</h3>
                    </header>
                    <Modal.Body>
                        <section className='w-full flex'>
                            <div className='flex justify-around w-full'>
                                <button onClick={() => { handleDeleteUser(user._id, userInformation, setCartInformation, setOpenModal2); setGetUser(true) }} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Sí, Eliminar</button>
                                <button onClick={() => setOpenModal2(false)} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Cancelar</button>
                            </div>
                        </section>
                    </Modal.Body>
                </>
            </div>
        </Modal>
    );
};

export default ModalDeleteUser;

