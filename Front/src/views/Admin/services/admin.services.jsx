import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getData = async (setProducts, page) => {
    try {
        const url = `${BASE_URL}/api/products/?page=${page}`;
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

export const nextPage = (page, setPage, products) => {
    if (page < products.arrayPages.length) {
        setPage(page + 1)
    }
}
export const prevPage = (page, setPage) => {
    if (page > 1) {
        setPage(page - 1)
    }
}