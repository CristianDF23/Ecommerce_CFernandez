import { insertProduct, getProducts, findProductById, updateProduct } from '../../../services/FileSystem/products.services.js'
import  __dirname  from '../../../path.js';
import fs from 'fs'

const filePath = `${__dirname}/dao/FileSystem/files/products.json`

export default class ProductManagerFS {
    
    //Crear producto nuevo
    createProduct = async (req, res) => {
        req.logger.info(`Iniciando la creación del producto - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        try {
            const user = req.user;
            let owner;
            if (user) {
                if (user.rol == 'Premium') {
                    owner = user.email;
                } else {
                    owner = 'Admin';
                }
            } else {
                req.logger.error(`Usuario no encontrado con el correo electrónico: ${req.body.email}`);
                return res.status(404).json({ Msg: 'Usuario no encontrado' });
            }

            let thumbnails = {}

            if (!req.files || req.files.length === 0) {
                thumbnails
            } else {
                req.files.forEach((file, index) => {
                    thumbnails[`thumbnail_${index + 1}`] = `http://localhost:${process.env.PORT}/img/products/${file.filename}`;
                });
            }

            const product = {
                code: req.body.code,
                status: true,
                stock: req.body.stock,
                brand: req.body.brand,
                title: req.body.title,
                category: req.body.category,
                thumbnails,
                description: req.body.description,
                price: req.body.price,
                owner
            };

            const newProduct = await insertProduct(product);
            if (!newProduct) {
                req.logger.warning(`Error al crear el producto - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: 'Error al crear el producto' });
            }

            req.logger.info(`Producto creado con éxito - ID: ${newProduct._id} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(201).redirect('http://localhost:5173/admin');
        } catch (error) {
            req.logger.error(`Error en createProduct: ${error}`);
            return res.status(500).send({ Msg: error });
        }
    };


    //Mostrar todos los productos/Paginación
    getProducts = async (req, res) => {
        req.logger.info(`Obteniendo productos - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        try {
            const { limit = 10, page = 1, sort = '', category = '', brand = '' } = req.query;
            const filter = {};
            if (category) filter.category = category;
            if (brand) filter.brand = brand;

            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort ? { price: sort === 'desc' ? -1 : 1 } : null,
            };

            const products = await getProducts(filter, options);

            if (!products) {
                req.logger.warning(`No se encontraron productos - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ Msg: 'No se encontraron productos' });
            }

            const status = 'success';
            const prevPage = products.hasPrevPage ? products.page - 1 : null;
            const nextPage = products.hasNextPage ? products.page + 1 : null;
            const prevLink = prevPage ? `/api/products/?${category ? `category=${category}&` : ''}${brand ? `brand=${brand}&` : ''}limit=${products.limit}&page=${prevPage}&sort=${sort}` : null;
            const nextLink = nextPage ? `/api/products/?${category ? `category=${category}&` : ''}${brand ? `brand=${brand}&` : ''}limit=${products.limit}&page=${nextPage}&sort=${sort}` : null;

            const productResponse = {
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
            const pages = Array.from({ length: productResponse.totalPages }, (_, i) => i + 1);
            productResponse.arrayPages = pages;
            req.logger.info(`Productos obtenidos con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(200).json(productResponse);
        } catch (error) {
            req.logger.error(`Error en getProducts: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Mostrar un producto
    getProduct = async (req, res) => {
        req.logger.info(`Obteniendo producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        try {
            const product = await findProductById(req.params.pid);
            if (!product) {
                req.logger.warning(`Producto con ID ${req.params.pid} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ Msg: 'Producto no encontrado' });
            }

            req.logger.info(`Producto con ID ${req.params.pid} obtenido con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(200).json(product);
        } catch (error) {
            req.logger.error(`Error en getProduct: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Eliminar un producto
    deleteProduct = async (req, res) => {
        req.logger.info(`Eliminando producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        const { email } = req.user;
        try {
            const isProductFound = await findProductById(req.params.pid);
            if (!isProductFound) {
                req.logger.warning(`Producto con ID ${req.params.pid} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ Msg: 'Producto no encontrado' });
            }

            if (isProductFound.owner === email || req.user.rol === 'Admin') {
                const products = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
                const newProducts = products.filter(p => p._id !== req.params.pid);
                await fs.promises.writeFile(filePath, JSON.stringify(newProducts, null, 2), 'utf-8');

                req.logger.info(`Producto con ID ${req.params.pid} eliminado con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(200).json({ Msg: 'Producto eliminado con éxito' });
            } else {
                req.logger.warning(`El usuario no tiene permiso para eliminar este producto - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: 'Usuario sin autorización para eliminar este producto' });
            }
        } catch (error) {
            req.logger.error(`Error al eliminar producto: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Actualizar un producto
    updateProduct = async (req, res) => {
        req.logger.info(`Actualizando producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
    
        try {
            const { pid } = req.params;
            const updateData = req.body;
    
            if (updateData.stock > 0) {
                updateData.status = true;
            } else if (updateData.stock === 0) {
                updateData.status = false;
            }
    
            const isUpdatedProduct = await updateProduct(pid, updateData);
    
            if (!isUpdatedProduct) {
                req.logger.warning(`Producto con ID ${req.params.pid} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ Msg: 'Producto no encontrado' });
            }
    
            req.logger.info(`Producto con ID ${req.params.pid} actualizado con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(200).json(isUpdatedProduct);
        } catch (error) {
            req.logger.error(`Error al actualizar producto: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

}


