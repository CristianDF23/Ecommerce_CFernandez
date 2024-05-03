import { NavLink, useParams } from "react-router-dom";
import { ProductsList } from "../components/Home/ProductsList";
import { Spin } from "../assets/Icons";
import { useEffect, useState } from "react";
import axios from 'axios'

export const Home = () => {
    const [product, setProduct] = useState(null); 
    const [page, setPage] = useState(1);
    const { cat } = useParams();

    useEffect(() => {
        const dates = async () => {
            let url = `http://localhost:8080/api/products/?page=${page}`;
            if (cat) {
                url = `http://localhost:8080/api/products/?category=${cat}&page=${page}`;
            }
            const response = await axios.get(url);
            setProduct(response.data);
        };
        dates();
    }, [cat, page]);

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

