import React, { useState } from 'react';
import { DeleteProd } from '../../../assets/Icons.jsx';
import ModalDeleteProduct from './ModalDeleteProduct.jsx';
import ModalUpdateProduct from './ModalUpdateProduct.jsx';

export const ListProducts = ({ items }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

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
                                <td className='pb-5'><ModalUpdateProduct item={item} /></td>
                                <td className='pb-1' onClick={() => handleOpenModal(item)}><DeleteProd /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedItem && (
                    <ModalDeleteProduct
                        item={selectedItem}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                )}
            </section>
        </section>
    );
};

