import React, { useContext, useState } from 'react';
import { BtnEdit } from '../BtnEdit';
import { DeleteProd } from '../../assets/Icons.jsx'
import { UserContext } from '../../context/userContext.jsx';
import { Modal } from 'flowbite-react';
import axios from 'axios';
import Swal from 'sweetalert2';


export const ListProducts = ({ items, user }) => {
    const { setChangeProd, userLog } = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false);
    const [productId, setProductId] = useState(null);

    const handleDeleteProduct = async () => {
        try {
            const resp = await axios.delete(`http://localhost:8080/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setChangeProd((prevChangeProd) => prevChangeProd + 1);
            setOpenModal(false);
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
            });
            Toast.fire({
                icon: "success",
                title: `Producto eliminado exitosamente`
            });
        } catch (error) {
            setOpenModal(false);
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
            });
            Toast.fire({
                icon: "error",
                title: "Error al eliminar el producto"
            });
        }
    }

    return (
        <section className="w-full">
            <section className="flex flex-col w-full mx-auto mt-10">
                <h2 className="text-3xl font-semibold mb-10 mx-auto">LISTA DE PRODUCTOS</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.code} className="hover:bg-slate-200 text-slate-500 text-center ">
                                <td className='h-16'>{item.code}</td>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td className='w-72 text-start px-6'>{item.title}</td>
                                <td>$ {item.price.toLocaleString()}</td>
                                <td>{item.stock}</td>
                                <td className='pb-5'><BtnEdit item={item} /></td>
                                <td className='pb-1' onClick={() => { setProductId(item._id); setOpenModal(true) }}><DeleteProd /></td>
                            </tr>
                        ))}
                    </tbody>
                    <Modal dismissible show={openModal}>
                        <div className='border rounded-none bg-white'>
                            <header className='h-auto py-4 flex-col flex justify-between items-center'>
                                <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>ESTA SEGURO?</h2>
                                <h3 className='text-2xl text-center w-full font-semibold text-gray-500 dark:text-white'>Esto eliminará el producto de su lista</h3>

                            </header>
                            <Modal.Body>
                                <section className='w-full flex'>
                                    <div className='flex justify-around w-full'>
                                        <button onClick={() => handleDeleteProduct()} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Si, Eliminar</button>
                                        <button onClick={() => setOpenModal(false)} className='w-52 py-2 bg-black px-5 text-white hover:text-slate-700'>Cancelar</button>
                                    </div>
                                </section>
                            </Modal.Body>
                        </div>
                    </Modal>
                </table>
            </section>

        </section>
    );
};


