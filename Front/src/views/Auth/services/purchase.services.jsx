import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleFinishPurchase = async (idCart, setOpenModal, setCartData, navigate) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/carts/${idCart}/purchase`);
        setCartData(response.data)
        setOpenModal(true)
        setTimeout(() => {
            navigate('/api/v1/home')
        }, 2000)
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
}

export const getCart = async (cartId, setProductInformation, setCartData) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/carts/${cartId}`);
        setProductInformation(response.data.products);
        setCartData(response.data)
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};