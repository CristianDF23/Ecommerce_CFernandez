import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleUpdateProduct = async (userInformation, setOpenModal, formData, navigate) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/mails/newTicket`, formData, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        localStorage.setItem('detailPurchase',  JSON.stringify(response.data))
        setOpenModal(true)
        setTimeout(() => {
            navigate('/api/v1/purchaseCompleted')
        }, 2500)
    } catch (error) {
        console.error('Error al realizar el pago:', error);
    }
};

export const changeDate = (setDataCard, value) =>{
    value = value.replace(/[^\d]/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    value = value.slice(0, 5);
    setDataCard(value);
}

export const changeCode = (setCode, value) =>{
    value = value.replace(/[^\d]/g, '');
    if (value.length > 3) {
        value = value.slice(0, 3);
    }
    setCode(value);
}

export const changeNumberCard = (setNumerCard, value) =>{
    value = value.replace(/[^\d]/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i += 4) {
        if (i + 4 < value.length) {
            formattedValue += value.slice(i, i + 4) + ' ';
        } else {
            formattedValue += value.slice(i, i + 4);
        }
    }
    formattedValue = formattedValue.slice(0, 19);
    setNumerCard(formattedValue);
}