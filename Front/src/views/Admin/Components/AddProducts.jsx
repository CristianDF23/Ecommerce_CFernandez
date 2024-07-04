import React, { useContext, useState } from 'react';
import { AlertBasic } from '../../../components/Alerts';
import { addProduct } from '../services/addProducts.services';
import { UserContext } from '../../../context/userContext';

export const AddProducts = () => {
    const { userInformation } = useContext(UserContext)
    const [openAlert, setOpenAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await addProduct(formData, setOpenAlert, userInformation);
        e.target.reset()
    };

    return (
        <section className="w-full">
            <section className="flex flex-col w-1/2 mx-auto mt-10">
                <h2 className="text-3xl text-center font-semibold mb-15">NUEVO PRODUCTO</h2>
                <section className="mt-5 flex flex-col gap-2">
                    {openAlert === 'error' && <AlertBasic color={'warning'} text={'El codigo de producto ya existe'} />}
                    {openAlert === 'success' && <AlertBasic color={'success'} text={`Producto agregado correctamente`} />}
                    <form onSubmit={handleSubmit} encType="multipart/form-data" id="productForm">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="category" id="category"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="category"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                    Categoria</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="title" id="title"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="title"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Titulo
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="brand" id="brand"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="brand"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                    Marca</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="code" id="code"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="code"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Codigo
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" name="stock" id="stock"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="stock"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                    Stock</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" name="price" id="price"
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500"
                                    placeholder="" />
                                <label htmlFor="price"
                                    className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">
                                    Precio</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <textarea name="description" id="description" cols="30" rows="5"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            <label htmlFor="description"
                                className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 ">Descripción
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="file" name="thumbnails" id="thumbnails" multiple={true}
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            <label htmlFor="thumbnails"
                                className="absolute bg-white text-l px-3 text-gray-500 -translate-y-6 translate-x-2 top-3 z-20 " >Imagen
                            </label>
                        </div>
                        <button id="addProd" type="submit" className="btns">AGREGAR PRODUCTO</button>
                    </form>
                </section>
            </section>
        </section>
    );
};
