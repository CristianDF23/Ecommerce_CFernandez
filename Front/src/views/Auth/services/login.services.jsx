import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleLogin = async (email, password, setUserInformation, setOpenAlert) => {
    try {

        const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        localStorage.setItem("userInformation", JSON.stringify(response.data))
        setUserInformation(JSON.parse(localStorage.getItem('userInformation')))
        setOpenAlert('success')
    } catch (error) {
        setOpenAlert('error')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2500)
    }
};

export const handleRestorePassword = async (sendEmail, setModalState, navigate) => {
    try {
        await axios.post(`${BASE_URL}/api/mails/generateToken`, { sendEmail }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setModalState(true);
        localStorage.setItem('userEmail', sendEmail);
        setTimeout(() => {
            navigate('/api/v1/home');
        }, 2500);
    } catch (error) {
        console.log(error);
    }
};