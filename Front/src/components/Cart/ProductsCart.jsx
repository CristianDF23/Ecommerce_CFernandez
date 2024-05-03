import { React, useContext, } from 'react'
import { Product } from './Product';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

export const ProductsCart = ({arrayProducts}) => {
    const {setProductsLength, cartId, infoCart} = useContext(UserContext)

    const handleCartEmpty = async () =>{
        await axios.delete(`http://localhost:8080/api/carts/${cartId}`)
        setProductsLength(0)
    }
    
    return (
        <>
            <section className="w-full py-20 px-7 bg-slate-50">
                <h3 className="text-xl text-slate-700 font-semibold mb-10">TU PEDIDO</h3>
                <div className='className="flex justify-between gap-2 border-b w-full mb-6 border border-solid overflow-auto h-96'>
                {arrayProducts.map((item) => <Product key={item._id} item={item}/>)}
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
            </section>
        </>
    )
}
