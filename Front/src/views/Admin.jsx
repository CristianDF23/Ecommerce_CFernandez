import React, { useContext, useEffect, useState } from 'react'
import { AddProducts } from '../components/Admin/AddProducts'
import { ListProducts } from '../components/Admin/ListProducts'
import axios from 'axios'
import { UserContext } from '../context/userContext'

export const Admin = () => {
    const initialValue = 'listProd';
    const [prods, setProds] = useState(initialValue);
    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(1);
    const {changeProd, userLog} = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/products/?page=${page}`;
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [page, changeProd]);

    const date = products?.payload || [];

    const nextPage = () => {
        if (page < products.arrayPages.length) {
            setPage(page + 1)
        }
    }
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    return (
        <section className="w-full ">
            <div className="ml-5 mt-5">
                <h2 className="text-2xl font-semibold uppercase">ADMINISTRADOR</h2>
            </div>
            <hr className="mt-4" />
            <ul className="flex mt-10 gap-5 justify-center">
                <li onClick={() => setProds(initialValue)} className="link p-5 font-semibold text-gray-800 cursor-pointer">LISTA DE
                    PRODUCTOS
                </li>
                <li onClick={() => setProds('addProd')} className="link p-5 font-semibold text-gray-800 cursor-pointer">AGREGAR
                    PRODUCTOS
                </li>
            </ul>
            <hr/>
            <section className="flex flex-col w-full mx-auto mt-10">
                {
                    prods == initialValue ? <>
                        <ListProducts items={date} user={userLog}/> 
                        <div className="mx-auto flex items-center justify-around w-1/2 mt-10 float-center">
                            <button onClick={prevPage} className="px-2 py-2 text-gray-700 text-2xl font-semibold hover:bg-gray-50">
                                {'<'}
                            </button>
                            <button onClick={nextPage} className="px-2 py-2 text-gray-700 text-2xl font-semibold hover:bg-gray-50">
                                {'>'}
                            </button>
                        </div>

                    </>
                        :
                        <AddProducts user={userLog}/>
                }
            </section>
        </section>
    )
}
