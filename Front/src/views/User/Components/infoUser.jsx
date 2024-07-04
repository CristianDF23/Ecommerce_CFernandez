import React, { useState } from 'react'
import ModalUpdateData from './ModalUpdateData';
import imgProfile from '../../../assets/profile.webp'
import { Pencil } from '../../../assets/Icons';
import { handleDocuments, renameFile } from '../services/documets.services';
import { findDocument } from '../../Admin/services/listUsers.services'
import { AlertBasic } from '../../../components/Alerts';

export const InfoUser = ({ user, setUserInformation }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [state, setState] = useState(false)
    const [formData, setFormData] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        age: user.age,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangeProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const profileInput = e.target.querySelector('input[name="profile"]');

        if (profileInput && profileInput.files.length > 0) {
            const originalFile = profileInput.files[0];
            const extension = originalFile.name.split('.').pop();
            const renamedFile = renameFile(originalFile, `${user.email}_profile.${extension}`);
            formData.append('profile', renamedFile);
            profileInput.value = null;

            handleDocuments(formData, user, setUserInformation, setOpenAlert);
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } else {
            setOpenAlert(true)
            setTimeout(() => {
                setOpenAlert(false)
            }, 2000)
        }
    }

    let imgUser = findDocument(user)

    return (
        <section className="w-full">
            <section className="flex flex-col w-1/2 mx-auto mt-10">
                <h2 className="text-3xl font-semibold mb-10">MIS DATOS</h2>
                {openAlert === true && <AlertBasic color={'info'} text={'Seleccione un archivo'} />}
                {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al actualizar imagen de perfil'} />}
                {openAlert === 'success' && <AlertBasic color={'success'} text={'Imagen de perfil actualizada correctamente'} />}
                <form onSubmit={handleChangeProfile} className='mx-auto flex flex-col justify-center items-center mb-6 w-fit h-fit'>
                    <div>
                        <img className='w-32 h-fit'
                            src={imgUser.profile !== undefined ? imgUser.profile.reference : imgProfile} alt="" />
                        <div className='file-input-wrapper -top-[40px] left-[115px]'>
                            <label htmlFor="profile" className='file-label'><Pencil /></label>
                            <input id='profile' type='file' name='profile' className='file-input' />
                        </div>
                    </div>
                    <button onClick={() => setState(!state)} type='submit' className='text-sm font-semibold hover:bg-black hover:text-white w-fit h-fit -mt-5'>ACTUALIZAR IMAGEN DE PERFIL</button>
                </form>
                <div className="flex flex-col gap-3">
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">NOMBRE</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${user.first_name} ${user.last_name}`}
                        </dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">EMAIL</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">CELULAR</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
                    </div>
                    <div className="px-4 py-6 border-b border-b-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-medium leading-6 text-gray-900">EDAD</dt>
                        <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.age} AÑOS</dd>
                    </div>
                </div>
                <>
                    <button className='mt-4 text-l font-semibold hover:bg-black hover:text-white w-fit' onClick={() => setOpenModal(true)}>ACTUALIZAR DATOS</button>
                </>
                <ModalUpdateData formData={formData} openModal={openModal} setOpenModal={setOpenModal} handleInputChange={handleInputChange} />
            </section>
        </section>
    )
}
