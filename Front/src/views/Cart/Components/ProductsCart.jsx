import { React, useContext, useState, } from 'react'
import { Product } from './Product';
import { UserContext } from '../../../context/userContext';
import { handleDeleteProducts } from '../services/productsCart.services';
import { AlertBasic } from '../../../components/Alerts';

export const ProductsCart = ({ arrayProducts, detailPay, cartData }) => {
    const { setCartInformation } = useContext(UserContext)
    const [openAlert, setOpenAlert] = useState(false)

    const handleCartEmpty = async () => {
        await handleDeleteProducts(cartData._id, setCartInformation, setOpenAlert)
    }

    return (
        <>
            <section className="w-full py-20 px-7 bg-slate-50">
                {openAlert && <AlertBasic text={'Carrito limpiado correctamente'} color={'success'} />}
                <h3 className="text-xl text-slate-700 font-semibold mb-10">TU PEDIDO</h3>
                <div className='className="flex justify-between gap-2 border-b w-full mb-6 border border-solid overflow-auto'>
                    {arrayProducts.map((item) => <Product key={item._id} item={item} />)}
                </div>
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex justify-between">
                        <h2 className=" text-slate-700">Subtotal</h2>
                        <h3 className=" text-slate-700">$ {detailPay.subTotal.toLocaleString()}</h3>
                    </div>
                    <div className="flex justify-between">
                        <h2 className=" text-slate-700">Entrega</h2>
                        {
                            detailPay.delivery == 'Gratis' ?
                                <h3 className=" text-slate-700">{detailPay.delivery}</h3> : <h3 className=" text-slate-700">$ {detailPay.delivery.toLocaleString()}</h3>
                        }
                    </div>
                    <hr />
                </div>
                <div className="flex justify-between">
                    <h2 className=" text-slate-700 font-semibold">Total</h2>
                    <h3 className=" text-slate-700 font-semibold">$ {`${detailPay.total.toLocaleString()}`}</h3>
                </div>
                <h2 className="text-gray-400">({`IVA incluido $ ${detailPay.taxAmount.toLocaleString()}`})</h2>
                <button onClick={handleCartEmpty}
                    className="font-semibold text-slate-700 p-1 float-right mt-10 hover:text-gray-400">
                    Limpiar Carrito
                </button>
            </section>
        </>
    )
}
