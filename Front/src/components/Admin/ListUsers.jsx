import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'

export const ListUsers = () => {
    const [users, setUsers] = useState([])
    const { userLog } = useContext(UserContext)

    useEffect(() => {
        const allUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/')
                setUsers(response.data.listUsers)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        allUsers()
    }, [])

    const updateRol = async (e, uid) => {
        const newRole = e.target.checked ? 'Premium' : 'Usuario'
        try {
            const response = await axios.put(`http://localhost:8080/api/auth/premium/${uid}`, { rol: newRole }, {
                headers: {
                    Authorization: `Bearer ${userLog.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            setUsers(users.map(user => (user._id === uid ? { ...user, rol: newRole } : user)))
            console.log(response);
        } catch (error) {
            console.error('Error updating user role:', error)
        }
    }

    return (
        <section className="w-full">
            <section className="flex flex-col w-full mx-auto mt-10">
                <h2 className="text-3xl font-semibold mb-10 mx-auto">LISTA DE USUARIOS</h2>
                <table className='mx-auto'>
                    <thead>
                        <tr>
                            <th className='px-12'>Correo</th>
                            <th className='px-12'>Nombre</th>
                            <th className='px-12'>Apellido</th>
                            <th className='px-12'>Rol</th>
                            <th className='px-12'>Usuario Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-200 text-slate-500 text-center">
                                <td className='h-16'>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td className='text-center'>{user.rol}</td>
                                {user.rol !== 'Admin' ? (
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="premium"
                                            id="premium"
                                            checked={user.rol === 'Premium'}
                                            onChange={(e) => updateRol(e, user._id)}
                                        />
                                    </td>
                                ) :
                                    (
                                        <></>
                                    )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    )
}
