import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const handleDocuments = async (formData, userInformation, setUserInformation, setOpenAlert) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/${userInformation._id}/documents`, formData, {
            headers: {
                Authorization: `Bearer ${userInformation.token}`,
            },
            withCredentials: true,
        });
        const user = JSON.parse(localStorage.getItem('userInformation'))
        user.documents = response.data.doc
        localStorage.setItem("userInformation", JSON.stringify(user))
        setUserInformation(JSON.parse(localStorage.getItem('userInformation')))
        setOpenAlert('success')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2000)
    } catch (error) {
        console.error('Error:', error);
        setOpenAlert('error')
        setTimeout(() => {
            setOpenAlert(false)
        }, 2000)
    }
};

export const renameFile = (file, newName) => {
    return new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
    });
};

