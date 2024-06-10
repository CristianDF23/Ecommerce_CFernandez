import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import  __dirname  from '../../path.js';

const filePath = `${__dirname}/dao/FileSystem/files/products.json`

export const insertProduct = async (product) => {
    try {
        let products = [];
        if (fs.existsSync(filePath)) {
            const res = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
            products = res;
        }
        product._id = uuidv4();
        products.push(product);
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
        return product;
    } catch (error) {
        console.error('Error al insertar el producto:', error);
        return null;
    }
};

export const getProducts = async (filter, options) => {
    try {
        if (!fs.existsSync(filePath)) {
            return {
                docs: [],
                totalPages: 1,
                page: 1,
                limit: options.limit,
                hasPrevPage: false,
                hasNextPage: false,
            };
        }

        const res = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
        let products = res.filter(product => {
            let isValid = true;
            if (filter.category) isValid = isValid && product.category === filter.category;
            if (filter.brand) isValid = isValid && product.brand === filter.brand;
            return isValid;
        });

        if (options.sort) {
            products.sort((a, b) => (a.price - b.price) * (options.sort.price === -1 ? -1 : 1));
        }

        const totalDocs = products.length;
        const totalPages = Math.ceil(totalDocs / options.limit);
        const page = options.page > totalPages ? totalPages : options.page;
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const paginatedProducts = products.slice((page - 1) * options.limit, page * options.limit);

        return {
            docs: paginatedProducts,
            totalPages,
            page,
            limit: options.limit,
            hasPrevPage,
            hasNextPage,
        };
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return null;
    }
};

export const findProductById = async (productId) => {
    try {
        const res = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
        const product = res.find(p => p._id === productId);
        return product || null;
    } catch (error) {
        console.error('Error al encontrar el producto por ID:', error);
        return null;
    }
};

// Función para actualizar un producto
export const updateProduct = async (productId, updatedProductData) => {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const data = fs.readFileSync(filePath);
    const products = JSON.parse(data);
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProductData };
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    }
};