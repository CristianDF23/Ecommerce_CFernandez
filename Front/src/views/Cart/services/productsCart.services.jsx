import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleDeleteProducts = async (cartId, setCartInformation, setOpenAlert) => {
    const response = await axios.delete(`${BASE_URL}/api/carts/${cartId}`)
    setOpenAlert(true)
    setTimeout(() => {
        setCartInformation(response.data.cart.products)
    }, 1500)
}

export const handleDeleteProduct = async (cartId, item, setCartInformation) => {
    const newCart = await axios.delete(`http://localhost:8080/api/carts/${cartId}/product/${item._id}`)
    setCartInformation(newCart)
}

export const handleQuantity = async (newQuantity, item, cartId, setCartInformation) => {
    const newCart = await axios.put(`${BASE_URL}/api/carts/${cartId}/product/${item._id}`, {
        quantity: newQuantity
    })
    setCartInformation(newCart)
}

