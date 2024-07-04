import { Modal } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ModalAddProduct = ({openModal, setOpenModal, item, detailPay}) => {
    return (
        <Modal id='modal' dismissible show={openModal}>
            <div className='border rounded-none bg-white'>
                <header className='h-16 flex justify-between items-center'>
                    <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>PRODUCTO AGREGADO AL CARRITO</h2>
                    <button type='button' onClick={() => setOpenModal(false)} className="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                </header>
                <Modal.Body>
                    <section className='w-full flex'>
                        <div className='w-1/2 px-3'>
                            <div className='flex'>
                                <img className='w-28' src={item.thumbnails.one} alt="" />
                                <div className='ml-3'>
                                    <h2 className='text-slate-900 font-semibold'>{item.category.toUpperCase()} {item.brand.toUpperCase()} {item.title.toUpperCase()}</h2>
                                    <h3 className='text-slate-900 font-semibold mt-2'>$ {item.price.toLocaleString('es-AR')}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 border-l-[1px] px-5 border-black '>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-sm underline'>Tu carrito</h2>
                                <h3>{detailPay.quantity} {detailPay.quantity == 1 ? 'Artículo' : 'Artículos'}</h3>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col gap-1'>
                                        <h3>Precio Total:</h3>
                                        <h3>Envío:</h3>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h3>$ {detailPay.total.toLocaleString()}</h3>
                                        <h3 className='text-end'>{detailPay.delivery}</h3>
                                    </div>
                                </div>
                                <hr className='h-0.5 bg-black' />
                                <div className='flex justify-between mb-5'>
                                    <div>
                                        <h2 className='font-bold'>Total:</h2>
                                        <span className='text-slate-500'>(Impuestos Incluidos)</span>
                                    </div>
                                    <h3 className='font-bold'>$ {detailPay.total.toLocaleString()}</h3>
                                </div>
                                <div className='w-full'>
                                    <button className='p-3 border text-start border-black font-semibold w-full hover:text-slate-600'><Link to={'/api/v1/cart'}>VER CARRITO</Link></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default ModalAddProduct