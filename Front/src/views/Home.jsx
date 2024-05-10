import { NavLink, useParams } from "react-router-dom";
import { ProductsList } from "../components/Home/ProductsList";
import { Spin } from "../assets/Icons";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Carrousel } from "../components/Carrousel";
import { Filter } from "../components/Filter";
import { UserContext } from "../context/userContext";

export const Home = () => {
    const [product, setProduct] = useState(null);
    const [page, setPage] = useState(1);
    const {filter} = useContext(UserContext)
    const { cat } = useParams();
    
    useEffect(() => {
        filter.brand ? filter.brand = localStorage.getItem('brand') : filter.brand = null
        filter.limit ? filter.limit = localStorage.getItem('limit') : filter.limit = 10
        filter.sort ? filter.sort = localStorage.getItem('sort') : filter.sort = null
        const getProducts = async () => {
            try {
                let url = `http://localhost:8080/api/products/?limit=${filter.limit}&page=${page}&sort=${filter.sort}`;
                if (cat) {
                    url = `http://localhost:8080/api/products/?limit=${filter.limit}&category=${cat}&page=${page}&sort=${filter.sort}`;
                }
                if (filter.brand && cat) {
                    url = `http://localhost:8080/api/products/?limit=${filter.limit}&brand=${filter.brand}&category=${cat}&page=${page}&sort=${filter.sort}`;
                } else if (filter.brand) {
                    url = `http://localhost:8080/api/products/?limit=${filter.limit}&brand=${filter.brand}&page=${page}&sort=${filter.sort}`;
                }
                const response = await axios.get(url);
                setProduct(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        getProducts();
    }, [cat, page, filter.sort, filter.brand, filter.limit]);

    const nextPage = () => {
        if (page < product.arrayPages.length) {
            setPage(page + 1)
        }
    }
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const changePage = (page) => {
        setPage(parseInt(page));
    };

    return (
        <>
            <main>
                <Carrousel />
                <Filter />
                {product ? (
                    <section className="mt-20">
                        <div className="container mx-auto mt-30 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            <ProductsList items={product.payload} />
                        </div>
                        <div className="mx-auto flex items-center justify-around w-1/2 mt-10 float-center">
                            <button onClick={prevPage} className="px-2 py-2 text-gray-400 font-semibold hover:bg-gray-50">
                                Anterior
                            </button>
                            <div>
                                {cat ?
                                    product.arrayPages.map((page, index) => (
                                        <NavLink
                                            key={index}
                                            to={`/category/${cat}/page/${page}`}
                                            onClick={() => changePage(page)}
                                            className="px-4 py-2 text-m font-semibold text-gray-400 hover:bg-gray-50"
                                        >
                                            {page}
                                        </NavLink>
                                    ))
                                    :
                                    product.arrayPages.map((page, index) => (
                                        <NavLink
                                            key={index}
                                            to={`/page/${page}`}
                                            onClick={() => changePage(page)}
                                            className="px-4 py-2 text-m font-semibold text-gray-400 hover:bg-gray-50"
                                        >
                                            {page}
                                        </NavLink>
                                    ))
                                }
                            </div>
                            <button onClick={nextPage} className="px-2 py-2 text-gray-400 font-semibold hover:bg-gray-50">
                                Siguiente
                            </button>
                        </div>
                    </section>
                ) : (
                    <Spin />
                )}
            </main>
        </>
    );
};

