import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async (setGetUsers) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/`)
        setGetUsers(response.data.userList)
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

export const handleUpdateRol = async (user, userInformation, setOpenAlert, setGetUser, setOpenModal) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/auth/premium/${user._id}`, {}, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        setGetUser(true);
        setOpenAlert('success')
        setTimeout(() => {
            setOpenAlert(false)
            setOpenModal(false)
        }, 2000)
    } catch (error) {
        setOpenAlert('error')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2000)
        console.error('Error updating user role:', error)
    }
}

export const handleDeleteUser = async (userId, userInformation, setOpenModal2) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/api/auth/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        setTimeout(() => {
            setOpenModal2(false);
        }, 2000);
    } catch (error) {
        console.log(error);
        setTimeout(() => {
            setOpenModal2(false);
        }, 2000);
    }
};

export const handleDeleteUsers = async (userInformation) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/api/auth/`, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
    }
};



export const findDocument = (user) => {
    const profile = user?.documents?.find(doc => doc.name == 'profile')
    const identificacion = user?.documents?.find(doc => doc.name == 'Identificacion')
    const comprobanteEstadoCuenta = user?.documents?.find(doc => doc.name == 'Comprobante de estado de cuenta');
    const comprobanteDomicilio = user?.documents?.find(doc => doc.name == 'Comprobante de domicilio');
    return { identificacion, comprobanteEstadoCuenta, comprobanteDomicilio, profile }
};





