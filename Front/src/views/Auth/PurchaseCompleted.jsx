import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import ModalPurchase from './Components/ModalPurchase';
import { getCart, handleFinishPurchase } from './services/purchase.services';

export const PurchaseCompleted = () => {
    const { cartData, setCartData, setProductInformation } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const tickets = JSON.parse(localStorage.getItem('detailPurchase'))

    useEffect(() => {
        getCart(cartData._id, setProductInformation, setCartData)
    }, [])

    console.log(cartData.products);
    return (
        <section className="w-5/6 flex flex-row-reverse gap-10 mx-auto">
            <div className="w-1/2 py-20 mx-auto flex flex-col gap-2">
                <div>
                    <p className='font-semibold text-slate-700 mb-3'>Pago Exitoso</p>
                    <h2 className='font-extrabold text-3xl mb-3'>GRACIAS POR SU COMPRA!</h2>
                    <p className='text-slate-500'>
                        ¡Gracias por tu pedido! Queríamos informarte que ya hemos enviado tu ticket de confirmación. ¡Revisa tu correo electrónico para ver los detalles!</p>
                </div>
                <div className='mt-10'>
                    <h3 className='font-semibold text-slate-700 mb-3'>Numero de compra</h3>
                    <p className='font-semibold text-blue-800 mb-3'>{tickets[0].codeTicket}</p>
                </div>
                <hr />
                {cartData.products.length > 0 && (
                    <div className='flex flex-col gap-3'>
                        {cartData.products.map((item) => (
                            <>
                                <div key={item._id} className='flex justify-between'>
                                    <div className='flex gap-3 text-xs'>
                                        <img className='w-20 rounded-md' src={item.product.thumbnails.one} alt="" />
                                        <div className='flex flex-col gap-2 py-1'>
                                            <h3 className='font-semibold text-slate-700'>{item.product.brand}</h3>
                                            <h3 className='font-semibold text-slate-500'>{item.product.title}</h3>
                                            <h3 >Cantidad: {item.quantity}</h3>
                                        </div>
                                    </div>
                                    <p className='text-slate-900 text-s'>${item.product.price.toLocaleString('es-AR')}</p>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                )}
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>Subtotal</h3>
                        <p className=' text-slate-700'>$ {tickets[0].detailPay.subTotal.toLocaleString('es-AR')}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>Envío</h3>
                        <p className=' text-slate-700'>{tickets[0].detailPay.entrega == 'Gratis' ? tickets[0].detailPay.entrega : `$ ${tickets[0].detailPay.entrega.toLocaleString('es-AR')}`}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>IVA</h3>
                        <p className=' text-slate-700'>$ {tickets[0].detailPay.iva.toLocaleString('es-AR')}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-900'>Total</h3>
                        <p className=' text-slate-900'>$ {tickets[0].detailPay.total.toLocaleString('es-AR')}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-20 text-sm'>
                    <h3 className=' text-slate-900 mb-3'>Detalle de Entrega</h3>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>{tickets[0].shippingDetail.name}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>{tickets[0].shippingDetail.phone}</h3>

                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>{tickets[0].shippingDetail.address}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className=' text-slate-700'>{tickets[0].shippingDetail.city} {tickets[0].shippingDetail.state}</h3>
                    </div>
                    <hr />
                    <div className='flex justify-end'>
                        <button onClick={() => handleFinishPurchase(cartData._id, setOpenModal, setCartData, navigate)} className='font-semibold text-lg text-slate-700 mb-3'>Finalizar Compra</button>
                    </div>
                </div>
            </div>
            <div id='containerPurchase' className="w-1/2 ">
            </div>
            <ModalPurchase openModal={openModal} text={'GRACIAS POR SU COMPRA!'}/>
        </section>
    );
}
