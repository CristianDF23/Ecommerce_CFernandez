import React, { useContext, useEffect, useState } from 'react'
import { AddProducts } from '../Admin/Components/AddProducts'
import { ListProducts } from '../Admin/Components/ListProducts'
import { UserContext } from '../../context/userContext'
import { ListUsers } from '../Admin/Components/ListUsers'
import { getData, nextPage, prevPage } from './services/admin.services'

export const Admin = () => {
    const initialValue = 'listProd';
    const [sectionAdmin, setSectionAdmin] = useState(initialValue);
    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(1);
    const { cartInformation, userInformation } = useContext(UserContext)

    useEffect(() => {
        getData(setProducts, page)
    }, [page, cartInformation]);

    const date = products?.payload || [];

    return (
        <section className="w-full ">
            <div className="ml-5 mt-5">
                <h2 className="text-2xl font-semibold uppercase">{userInformation.rol == 'Admin' ? 'ADMINISTRADOR' : `HOLA ${userInformation.first_name}!`}</h2>
            </div>
            <hr className="mt-4" />
            <ul className="flex mt-10 gap-5 justify-center">
                <li onClick={() => setSectionAdmin(initialValue)} className="link p-5 font-semibold text-gray-800 cursor-pointer">LISTA DE
                    PRODUCTOS
                </li>
                <li onClick={() => setSectionAdmin('addProd')} className="link p-5 font-semibold text-gray-800 cursor-pointer">AGREGAR
                    PRODUCTOS
                </li>
                {userInformation.rol == 'Admin' ? <li onClick={() => setSectionAdmin('userList')} className="link p-5 font-semibold text-gray-800 cursor-pointer">LISTA DE USUARIOS
                </li>
                    : <></>
                }
            </ul>
            <hr />
            <section className="flex flex-col w-full mx-auto mt-10">
                {
                    sectionAdmin == initialValue ? <>
                        <ListProducts items={date} user={userInformation} />
                        <div className="mx-auto flex items-center justify-around w-1/2 mt-10 float-center">
                            <button onClick={() => prevPage(page, setPage)} className="px-2 py-2 text-gray-700 text-xl font-semibold hover:bg-gray-50">
                                {'ANTERIOR'}
                            </button>
                            <button onClick={() => nextPage(page, setPage, products)} className="px-2 py-2 text-gray-700 text-xl font-semibold hover:bg-gray-50">
                                {'SIGUIENTE'}
                            </button>
                        </div>
                    </>
                        : sectionAdmin == 'addProd' ? <AddProducts user={userInformation} /> : <ListUsers />
                }
            </section>
        </section>
    )
}
