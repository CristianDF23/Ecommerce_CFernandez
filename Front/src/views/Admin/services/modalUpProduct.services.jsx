import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleUpdateProduct = async (formData, userInformation, item, setOpenModal, setCartInformation, setOpenAlert) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/products/${item._id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${userInformation.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        setOpenAlert('success')
        setTimeout(() => {
            setOpenAlert(false)
            setOpenModal(false);
            setCartInformation(response.data)
        },2000)
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        setOpenAlert('error')
        setTimeout(() => {
            setOpenAlert(false)
        },2000)
    }
};