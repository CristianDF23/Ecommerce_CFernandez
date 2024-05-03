import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import { InfoUser } from '../components/User/infoUser'
import { ProductsUser } from '../components/User/ProductsUser';


export const User = () => {
    const initialValue = 'infoUser';
    const [user, setUser] = useState(initialValue);

    const { userLog, productsLength, productsCart } = useContext(UserContext)
    return (
        <section className="w-full ">
            <div className="ml-5 mt-5">
                <h2 className="text-2xl font-semibold uppercase">{`HOLA ${userLog.first_name}!`}</h2>
            </div>
            <hr className="mt-4" />
            <ul className="flex mt-10 gap-5 justify-center">
                <li onClick={() => setUser(initialValue)} className="link p-5 font-semibold text-gray-800 cursor-pointer">MIS DATOS
                </li>
                <li onClick={() => setUser('updateUser')} className="link p-5 font-semibold text-gray-800 cursor-pointer">DETALLE
                </li>
            </ul>
            <hr />
            <section className="flex flex-col w-full mx-auto mt-10">
                {user === initialValue ? (
                    <InfoUser user={userLog} />
                ) : (
                    <>
                        {productsLength === 0 ? (
                            <h2 className="text-3xl font-semibold mb-10 text-center">Carrito Vacío</h2>
                        ) : (
                            <ProductsUser items={productsCart} />
                        )}
                    </>
                )}
            </section>
        </section>
    )
}
