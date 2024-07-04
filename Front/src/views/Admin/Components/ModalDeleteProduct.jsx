import React, { useContext, useState } from 'react';
import { Modal } from 'flowbite-react';
import { UserContext } from '../../../context/userContext';
import { handleDeleteProduct } from '../services/listProducts.services';
import { AlertBasic } from '../../../components/Alerts'

const ModalDeleteProduct = ({ openModal, setOpenModal, item }) => {
    const { userInformation, setCartInformation } = useContext(UserContext);
    const [openAlert, setOpenAlert] = useState(false);

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <div className='border rounded-none bg-white'>
                {openAlert === false ? (
                    <>
                        <header className='h-auto py-4 flex-col flex justify-between items-center'>
                            <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>¿ESTÁ SEGURO?</h2>
                            <h3 className='text-2xl text-center w-full font-semibold text-gray-500 dark:text-white'>Esto eliminará el producto de su lista</h3>
                        </header>
                        <Modal.Body>
                            <section className='w-full flex'>
                                <div className='flex justify-around w-full'>
                                    <button onClick={() => handleDeleteProduct(item._id, userInformation, setCartInformation, setOpenModal, setOpenAlert)} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Sí, Eliminar</button>
                                    <button onClick={() => setOpenModal(false)} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Cancelar</button>
                                </div>
                            </section>
                        </Modal.Body>
                    </>
                ) : (
                    <>
                        {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al eliminar el producto'} />}
                        {openAlert === 'success' && <AlertBasic color={'success'} text={`Producto eliminado correctamente`} />}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default ModalDeleteProduct;