import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleRestorePassword = async (token, password, confirmPassword, email, setOpenAlert, navigate) => {
    try {
        if (password !== confirmPassword) {
            setOpenAlert('info')
            setTimeout(() => { setOpenAlert(false) }, 2000)
            return;
        }

        const response = await axios.post(`${BASE_URL}/api/auth/restorePassword`, { token, password, email });
        setOpenAlert('success')
        setTimeout(() => {
            if (response) {
                setOpenAlert(false)
                localStorage.removeItem('userEmail')
                navigate('/api/v1/home');
            }
        }, 2000)
    } catch (error) {
        console.error(error)
        setOpenAlert('error')
        setTimeout(() => { setOpenAlert(false) }, 2000)
    }
};