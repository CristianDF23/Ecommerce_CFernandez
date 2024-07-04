import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers, handleDeleteUsers } from '../services/listUsers.services'
import ModalDetailUser from './ModalDetailUser'
import { DeleteProd, DeleteUsers } from '../../../assets/Icons'
import ModalDeleteUser from './ModalDeleteUser'
import { UserContext } from '../../../context/userContext'

export const ListUsers = () => {
    const {userInformation} = useContext(UserContext)
    const [getUsers, setGetUsers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)
    const [getUser, setGetUser] = useState(false)

    useEffect(() => {
        getAllUsers(setGetUsers)
    }, [getUser])

    const userNoAdmin = getUsers.filter(user => user.rol != 'Admin')
    return (
        <section className="w-full">
            <section className="flex flex-col w-full mx-auto mt-10">
                <div className='flex justify-center items-center gap-10 mb-10'>
                    <h2 className="text-3xl font-semibold w-fit">LISTA DE USUARIOS</h2>
                    {userNoAdmin.length != 0 ? <button onClick={()=> {handleDeleteUsers(userInformation); setGetUser(!getUser)}}><DeleteUsers /></button> : <></>}
                </div>
                {userNoAdmin.length == 0 ? <h2 className="text-xl font-semibold mb-10 mx-auto">No existe ningún usuario registrado</h2> :
                    <table className='mx-auto'>
                        <thead>
                            <tr>
                                <th className='px-12'>Correo</th>
                                <th className='px-12'>Nombre</th>
                                <th className='px-12'>Apellido</th>
                                <th className='px-12'>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUsers.map((user) => (
                                user.rol !== 'Admin' && <tr key={user._id} className="hover:bg-slate-200 text-slate-500 text-center">
                                    <td className='h-16'>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td className='text-center'>{user.rol}</td>
                                    <td><button onClick={() => { setOpenModal(true); setGetUser(user) }} className='text-l font-semibold hover:bg-black hover:text-white w-fit'>Ver usuario</button></td>
                                    <td><button onClick={() => { setOpenModal2(true); setGetUser(user) }} className='text-l ml-8'><DeleteProd /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </section>
            <ModalDetailUser openModal={openModal} setOpenModal={setOpenModal} getUser={getUser} setGetUser={setGetUser} />
            <ModalDeleteUser openModal2={openModal2} setOpenModal2={setOpenModal2} user={getUser} setGetUser={setGetUser} />
        </section >
    )
}
