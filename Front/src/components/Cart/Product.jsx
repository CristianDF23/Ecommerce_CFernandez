import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext';

export const Product = ({ item }) => {
    const stock = item.product.stock
    const opcionesStock = Array.from({ length: stock }, (_, index) => index + 1);
    const [cant, setCant] = useState(1)
    const {cartId, setUserCart} = useContext(UserContext)

    const handleDeleteProduct = async () =>{
        const newCart = await axios.delete(`http://localhost:8080/api/carts/${cartId}/product/${item._id}`)
        setUserCart(newCart);
    }

    const handleQuantity = async (e) =>{
        const newQuantity = parseInt(e.target.value);
        setCant(newQuantity)
        const newCart = await axios.put(`http://localhost:8080/api/carts/${cartId}/product/${item._id}`,{
            quantity:newQuantity
        })
        setUserCart(newCart);
    }


    return (
        <>
            <div className="flex">
                <img className="w-48 " src={item.product.thumbnails.one} alt="" />
                <div className="py-2 px-2 w-full flex flex-col gap-2">
                    <h2 className="text-black text-l">{item.product.category} {item.product.title}</h2>
                    <h4 className="text-black">$ {item.product.price.toLocaleString()}</h4>
                    <div>
                    <h3 className=" text-black">
                        Cantidad: {item.quantity}
                    </h3>
                    </div>
                    <select name="quantity" className="qtySelector w-1/4" onChange={handleQuantity}>
                        {opcionesStock.map((cantidad, index) => (
                            <option key={index} value={cantidad}>
                                {cantidad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col justify-between">
                    <button className="p-3" onClick={handleDeleteProduct}>
                        <svg className="w-6 h-6  hover:text-gray-400 text-slate-900 dark:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M6 18 18 6m0 12L6 6" />
                        </svg>
                    </button>
                </div>
            </div>
            <hr />
        </>
    )
}
