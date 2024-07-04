import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const newUser = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    age: '',
}

export const handleRegister = async (formData, setOpenAlert, passwordVal, navigate) => {
    if (formData.password !== passwordVal) {
        setOpenAlert('password');
        setTimeout(() => {
            setOpenAlert(false);
        }, 2500)
    } else {
        try {
            const data = await registerUser(formData);
            console.log('Registro exitoso:', data);
            setOpenAlert('success');
            setTimeout(() => {
                navigate('/api/v1/login');
            }, 2500)
        } catch (error) {
            console.error('Error en el registro:', error);
            setOpenAlert('error');
            setTimeout(() => {
                setOpenAlert(false);
            }, 2500)
        }
    }
};