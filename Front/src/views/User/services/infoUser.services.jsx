import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleUpdateUser = async (userInformation, formData, setOpenModal, setUserInformation, setOpenAlert) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/api/auth/${userInformation._id}`,
            formData
        );
        localStorage.setItem("userInformation", JSON.stringify(response.data))
        setUserInformation(JSON.parse(localStorage.getItem('userInformation')))
        setOpenAlert('success')
        setTimeout(() => {
            setOpenModal(false);
            setOpenAlert(false)
        }, 2000)
    } catch (error) {
        console.error(error);
        setOpenAlert('error')
        setTimeout(() => {
            setOpenModal(true);
        }, 2000)
    }
};