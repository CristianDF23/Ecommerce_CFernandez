import React, { useContext } from 'react'
import { UserContext } from '../../../context/userContext';
import { DeleteProd } from '../../../assets/Icons';
import { handleDeleteProduct, handleQuantity } from '../services/productsCart.services';

export const Product = ({ item }) => {
    const { cartData, setCartInformation } = useContext(UserContext)
    const stock = item.product.stock
    const opcionsStock = Array.from({ length: stock }, (_, index) => index + 1);

    const handleSubmit = async (e) => {
        const newQuantity = parseInt(e.target.value);
        await handleQuantity(newQuantity, item, cartData._id, setCartInformation)
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
                    <select name="quantity" className="qtySelector w-1/4" onChange={handleSubmit}>
                        {opcionsStock.map((cantidad, index) => (
                            <option key={index} value={cantidad}>
                                {cantidad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col justify-between">
                    <button className="p-3" onClick={()=> handleDeleteProduct(cartData._id, item, setCartInformation)}>
                        <DeleteProd />
                    </button>
                </div>
            </div>
            <hr />
        </>
    )
}
