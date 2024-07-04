import React, { useContext, useState } from 'react'
import { Modal } from "flowbite-react";
import { UserContext } from '../../../context/userContext';
import { handleUpdateProduct } from '../services/modalUpProduct.services';
import { AlertBasic } from '../../../components/Alerts'

const ModalUpdateProduct = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { setCartInformation, userInformation } = useContext(UserContext)
    const [formData, setFormData] = useState({
        category: item.category,
        title: item.title,
        brand: item.brand,
        code: item.code,
        stock: item.stock,
        price: item.price,
        description: item.description,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        handleUpdateProduct(formData, userInformation, item, setOpenModal, setCartInformation, setOpenAlert)
    }

    return (
        <>
            <button className='mt-4 text-l font-semibold hover:bg-black hover:text-white w-fit' onClick={() => setOpenModal(true)}>Editar</button>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <div className='border rounded-none bg-white'>
                    {openAlert === 'error' && <AlertBasic color={'warning'} text={`Error al actualizar el producto`} />}
                    {openAlert === 'success' && <AlertBasic color={'success'} text={`Producto actualizado correctamente`} />}
                    <header className='h-16 flex justify-between items-center'>
                        <h2 className='text-xl text-center w-full font-semibold text-gray-900 dark:text-white'>{formData.category} {formData.title}</h2>
                        <button type='button' onClick={() => setOpenModal(false)} className="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                    </header>
                    <hr />
                    <Modal.Body>
                        <div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="category" id="category"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={item.category} value={formData.category} onChange={handleInputChange} />
                                    <label htmlFor="category"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Categoria</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="title" id="title"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={item.title} value={formData.title} onChange={handleInputChange} />
                                    <label htmlFor="title"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Titulo
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="brand" id="brand"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={item.brand} value={formData.brand} onChange={handleInputChange} />
                                    <label htmlFor="brand"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Marca</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="code" id="code"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={item.code} value={formData.code} onChange={handleInputChange} />
                                    <label htmlFor="code"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Codigo
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="number" name="stock" id="stock"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={item.stock} value={formData.stock} onChange={handleInputChange} />
                                    <label htmlFor="stock"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Stock</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="number" name="price" id="price"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                        placeholder={`$ ${item.price.toLocaleString()}`} value={formData.price} onChange={handleInputChange} />
                                    <label htmlFor="price"
                                        className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                        Precio</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <textarea name="description" id="description" cols="30" rows="5" placeholder={item.description} value={formData.description} onChange={handleInputChange}
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                                <label htmlFor="description"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Descripción
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleSubmit} id="updateUser" className="mx-auto btns">ACTUALIZAR PRODUCTO</button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}

export default ModalUpdateProduct