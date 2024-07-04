import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addProduct = async (formData, setOpenAlert, userInformation) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/products`, formData, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        setOpenAlert('success')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2000);
    } catch (error) {
        console.error(error)
        setOpenAlert('error')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2000);
    }
};
