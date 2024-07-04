import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleDeleteProduct = async (productId, userInformation, setCartInformation, setOpenModal, setOpenAlert) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        setCartInformation((prevCartInformation) => prevCartInformation + 1 );
        setOpenAlert('success');
        setTimeout(() => {
            setOpenModal(false);
            setOpenAlert(false);
        }, 3000);
    } catch (error) {
        console.log(error);
        setOpenAlert('error');
        setTimeout(() => {
            setOpenModal(false);
            setOpenAlert(false);
        }, 3000);
    }
};