import { Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { handleRestorePassword } from '../services/login.services'
import { useNavigate } from 'react-router-dom';

const ModalRestoresPassword = ({ openModal, setOpenModal, modalState, setModalState }) => {
    const navigate = useNavigate();
    const [sendEmail, setSendEmail] = useState('')

    return (
        <>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <div className='border rounded-none bg-white'>
                    {
                        modalState == false ? (
                            <Modal.Body>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                    <h2 className='font-semibold text-3xl text-center text-slate-800'>INGRESE SU EMAIL</h2>
                                    <input className='w-3/4' type='email' name='sendEmail' id='sendEmail' value={sendEmail} onChange={(e) => setSendEmail(e.target.value)} required />
                                    <button onClick={() => handleRestorePassword(sendEmail, setModalState, navigate)} type='button' className='btns'>ENVIAR CORREO</button>
                                </div>
                            </Modal.Body>
                        ) : (
                            <Modal.Body>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                    <h3 className='text-3xl text-center text-slate-800'>Enviamos un correo a</h3>
                                    <h4 className='text-xl text-center text-slate-800 font-semibold'>{sendEmail}</h4>
                                    <p className='text-xl text-center text-slate-800'>Ingresá a tu correo y seguí las intrucciones para continuar la recuperación de la contraseña.</p>
                                </div>
                            </Modal.Body>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}

export default ModalRestoresPassword