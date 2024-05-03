import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ProductDetail from '../components/Home/ProductDetail';
import { Spin } from '../assets/Icons';
import axios from 'axios'

export const Product = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const dates = async () => {
            let url = `http://localhost:8080/api/products/${id}`;
            const response = await axios.get(url);
            setProduct(response.data);
        };
        dates();
    }, []);

    return (
        <div className="bg-white">
            {product ? (
                <ProductDetail item={product} />
            ) : (
                <Spin />
            )}
        </div>
    )
}

