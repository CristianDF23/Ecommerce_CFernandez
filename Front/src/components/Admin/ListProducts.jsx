import React, { useContext } from 'react';
import { BtnEdit } from '../BtnEdit';
import { DeleteProd } from '../../assets/Icons.jsx'
import { UserContext } from '../../context/userContext.jsx';
import axios from 'axios';

export const ListProducts = ({ items, user }) => {
    const { setChangeProd } = useContext(UserContext)

    const handleDeleteProduct = async (productId) => {
        await axios.delete(`http://localhost:8080/api/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        setChangeProd((prevChangeProd) => prevChangeProd + 1)
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
                            <tr key={item._id} className="hover:bg-slate-200 text-slate-500 text-center ">
                                <td className='h-16'>{item.code}</td>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td className='w-72 text-start px-6'>{item.title}</td>
                                <td>$ {item.price.toLocaleString()}</td>
                                <td>{item.stock}</td>
                                <td className='pb-5'><BtnEdit item={item} /></td>
                                <td className='pb-1'><DeleteProd fn={() => handleDeleteProduct(item._id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};


