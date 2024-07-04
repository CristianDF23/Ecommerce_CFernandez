import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Spin } from '../../assets/Icons';
import ProductDetail from './Components/ProductDetail';
import { getProduct } from './services/product.services'


export const Product = () => {
    const [product, setProduct] = useState(null)
    const { productId } = useParams();

    useEffect(() => {
        getProduct(productId, setProduct)
    }, [])

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

