import { Modal } from 'flowbite-react'
import React from 'react'

const ModalPurchase = ({ openModal, text }) => {
    return (
        <Modal dismissible show={openModal}>
            <div className='border rounded-none bg-white'>
                <Modal.Body>
                    <h2 className='font-semibold text-3xl text-center text-slate-800'>{text}</h2>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default ModalPurchase