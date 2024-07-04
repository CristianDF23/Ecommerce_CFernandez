import { useParams } from "react-router-dom";
import { Spin } from "../../assets/Icons";
import { useContext, useEffect, useState } from "react";
import { Products } from "./Components/Products";
import Pagination from "./Components/Pagination";
import { Carrousel } from "../../components/Carrousel";
import { getProducts } from "./services/Home.services";
import {Filter} from '../../components/Filter'
import { UserContext } from "../../context/userContext";

export const Home = () => {
    const [products, setProducts] = useState({});
    const [page, setPage] = useState(1);
    const {filter} = useContext(UserContext)
    const { category } = useParams();

    useEffect(() => {
        getProducts(setProducts, page, category);
    }, [page, category, filter]);

    return (
        <main>
            <Carrousel />
            <Filter />
            {products.payload ? (
                <section className="mt-20">
                    <div className="container mx-auto mt-30 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.payload.map((item) => <Products key={item._id} item={item} />)}
                    </div>
                    <Pagination category={category} page={page} arrayPages={products.arrayPages} setPage={setPage} />
                </section>
            ) : (
                <Spin />
            )}
        </main>
    );
};