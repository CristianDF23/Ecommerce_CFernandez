import { React, useContext, useState, } from 'react'
import { Product } from './Product';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { Modal } from 'flowbite-react';

export const ProductsCart = ({ arrayProducts }) => {
    const {setProductsLength, cartId, infoCart } = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteProducts = async() =>{
            await axios.delete(`http://localhost:8080/api/carts/${cartId}`)
            setProductsLength(0)
    }

    const handleCartEmpty = () => {
            setOpenModal(true)
    }

    return (
        <>
            <section className="w-full py-20 px-7 bg-slate-50">
                <h3 className="text-xl text-slate-700 font-semibold mb-10">TU PEDIDO</h3>
                <div className='className="flex justify-between gap-2 border-b w-full mb-6 border border-solid overflow-auto h-96'>
                    {arrayProducts.map((item) => <Product key={item._id} item={item} />)}
                </div>
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex justify-between">
                        <h2 className=" text-slate-700">Subtotal</h2>
                        <h3 className=" text-slate-700">$ {infoCart.subTotal.toLocaleString()}</h3>
                    </div>
                    <div className="flex justify-between">
                        <h2 className=" text-slate-700">Entrega</h2>
                        {
                            infoCart.entrega == 'Gratis' ?
                                <h3 className=" text-slate-700">{infoCart.entrega}</h3> : <h3 className=" text-slate-700">$ {infoCart.entrega.toLocaleString('es-AR')}</h3>
                        }
                    </div>
                    <hr />
                </div>
                <div className="flex justify-between">
                    <h2 className=" text-slate-700 font-semibold">Total</h2>
                    <h3 className=" text-slate-700 font-semibold">$ {`${infoCart.total.toLocaleString()}`}</h3>
                </div>
                <h2 className="text-gray-400">({`IVA incluido $ ${infoCart.ivaPrice}`})</h2>
                <button onClick={handleCartEmpty}
                    className="font-semibold text-slate-700 p-1 float-right mt-10 hover:text-gray-400">
                    Limpiar Carrito
                </button>
                <Modal dismissible show={openModal}>
                    <div className='border rounded-none bg-white'>
                        <header className='h-auto py-4 flex justify-between items-center'>
                            <div className='px-3 flex flex-col gap-3'>
                            <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>ESTA SEGURO?</h2>
                            <h3 className='text-2xl text-center w-full font-semibold text-gray-500 dark:text-white'>Esto eliminará todos los productos del carrito</h3>
                            </div>
                            <button type='button' onClick={() => setOpenModal(false)} className="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                        </header>
                        <Modal.Body>
                            <section className='w-full flex'>
                                <div className='flex justify-around w-full'>
                                    <button onClick={handleDeleteProducts} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Si, Limpiar carrito</button>
                                    <button onClick={()=> setOpenModal(false)} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Cancelar</button>
                                </div>
                            </section>
                        </Modal.Body>
                    </div>
                </Modal>
            </section>
        </>
    )
}
