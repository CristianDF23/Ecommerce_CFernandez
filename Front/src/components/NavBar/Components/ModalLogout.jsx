import { Modal } from 'flowbite-react'
import React from 'react'

const ModalLogout = ({openModal}) => {
    return (
        <Modal dismissible show={openModal}>
            <div className="bg-white border-none rounded-none">
                <Modal.Body>
                    <h2 className="font-semibold text-3xl text-center">GRACIAS POR TU VISITA!</h2>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default ModalLogout