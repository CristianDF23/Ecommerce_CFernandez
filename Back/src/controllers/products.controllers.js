import { insertProduct, findProductById, findProduct, allProducts, delProduct, upProduct } from "../services/products.services.js";
import { changeNameImg } from "../utils/multer.js";

//Crear producto nuevo
export const createProduct = async (req, res) => {
    const images = req.files.map(changeNameImg)
    try {
        const thumbnails = {};
        images.forEach((file, index) => {
            if (index === 0) {
                thumbnails.one = file;
            } else if (index === 1) {
                thumbnails.two = file;
            } else if (index === 2) {
                thumbnails.three = file;
            } else if (index === 3) {
                thumbnails.four = file;
            }
        });
        const product = {
            code: req.body.code,
            status: true,
            stock: req.body.stock,
            brand: req.body.brand,
            title: req.body.title,
            category: req.body.category,
            thumbnails,
            description: req.body.description,
            price: req.body.price
        }
        const newProduct = await insertProduct(product);
        return res.status(201).redirect('http://localhost:5173/admin');

    } catch (error) {
        console.log(error);
    };
};

//Mostrar todos los productos/Paginación
export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', category = '', brand = ''} = req.query;
        const filter = {};
        if(category) filter.category = category
        if(brand) filter.brand = brand

        
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
        };

        if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 };

        const products = await allProducts(filter, options);

        const status = products ? 'success' : 'error';
        const prevPage = products.hasPrevPage ? products.page - 1 : null;
        const nextPage = products.hasNextPage ? products.page + 1 : null;
        const prevLink = prevPage ? `/api/products/?${category ? `category=${category}&` : ''}${brand ? `brand=${brand}&` : ''}limit=${products.limit}&page=${prevPage}&sort=${sort}` : null;
        const nextLink = nextPage ? `/api/products/?${category ? `category=${category}&` : ''}${brand ? `brand=${brand}&` : ''}llimit=${products.limit}&page=${nextPage}&sort=${sort}` : null;

        const product = {
            status,
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage,
            nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink,
            nextLink,
        };
        const pages = Array.from({ length: product.totalPages }, (_, i) => i + 1);
        product.arrayPages = pages
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
    };
};

//Mostrar un producto
export const getProduct = async (req, res) => {
    try {
        const product = await findProductById(req.params.pid);
        if (!product) {
            return res.status(400).json({ Msg: `Producto no encontrado` });
        } else {
            return res.status(200).json(product);
        };
    } catch (error) {
        console.log(error);
    };
};

//Eliminar un producto
export const deleteProduct = async (req, res) => {
    console.log(req.params);
    try {
        const deleteById = await delProduct(req.params.pid);
        if (!deleteById) {
            return res.status(400).json({ Msg: `Producto no encontrado` });
        } else {
            return res.status(200).json(deleteById)
        };
    } catch (error) {
        console.log(error);
    };
};

//Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;

        if (updateData.stock > 0) {
            updateData.status = true;
        }else if(updateData.stock == 0){
            updateData.status = false;
        }

        const updatedProduct = await upProduct(pid, updateData);

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};





