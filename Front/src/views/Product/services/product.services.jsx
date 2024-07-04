import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sizes = [37, 38, 39, 40, 41, 42, 43, 44]
export const sizeTwo = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

export const getProduct = async (id, setProduct) => {
    try {
        let url = `${BASE_URL}/api/products/${id}`;
        const response = await axios.get(url);
        setProduct(response.data);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
};

export const handleAddToCart = async (userInformation, item, setOpenModal, setCartInformation) => {
    try {
        let url = `${BASE_URL}/api/carts/${userInformation.cart}/product/${item._id}`;
        const response = await axios.post(url, { pid: item._id },
            {
                headers: {
                    Authorization: `Bearer ${userInformation.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        setCartInformation(response.data);
        setOpenModal(true)
    } catch (error) {
        setOpenModal(false);
    }
};