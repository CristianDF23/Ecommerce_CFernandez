import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleLogOut = async (setOpenModal, email, navigate, setUserInformation) => {
    try {
        await axios.post(`${BASE_URL}/api/auth/logout`, { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        setOpenModal(true)
        setTimeout(() => {
            localStorage.clear()
            setUserInformation(null)
            setOpenModal(false)
        }, 2000)
        navigate('/api/v1/home')
    } catch (error) {
        console.log(error);
    }
}