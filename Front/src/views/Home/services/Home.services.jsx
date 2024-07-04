import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const nextPage = (page, setPage, arrayPages) => {
    if (page < arrayPages.length) {
        setPage(page + 1);
    }
}

export const prevPage = (page, setPage) => {
    if (page > 1) {
        setPage(page - 1);
    }
}

export const changePage = (page, setPage) => {
    setPage(parseInt(page));
};

export const getProducts = async (setProducts, page, category) => {
    try {
        const brand = localStorage.getItem('brand') || null;
        const limit = localStorage.getItem('limit') || 10;
        const sort = localStorage.getItem('sort') || null;

        let url = `${BASE_URL}/api/products/?limit=${limit}&page=${page}`;

        if (sort) url += `&sort=${sort}`;
        if (category) url += `&category=${category}`;
        if (brand) url += `&brand=${brand}`;
        console.log(brand, limit, sort);
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};