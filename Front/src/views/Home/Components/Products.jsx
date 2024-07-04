import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Products = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link
            to={item.status ? `/api/v1/product/${item._id}` : ''}
            className={`group border-solid flex flex-col border border-gray-100 idProd hover:border-gray-700 ${item.status ? '' : 'disabled-link'}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    src={isHovered ? item.thumbnails.two : item.thumbnails.one}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <p className="stock hidden"></p>
            <h3 className="mt-4 ml-4 text-l text-gray-700">{item.category} <span className="font-bold">{item.brand}</span>
            </h3>
            <h3 className="mt-4 ml-4 text-l text-gray-700">{item.title}</h3>
            <p className="mt-4 mb-2 ml-4 text-xl font-medium">$ {item.price.toLocaleString()} </p>
        </Link>
    );
};