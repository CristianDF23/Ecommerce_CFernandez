import { insertProduct, findProductById, allProducts, delProduct, upProduct } from "../services/products.services.js";

//Crear producto nuevo
export const createProduct = async (req, res) => {
    req.logger.info(`Iniciando la creación del producto - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
    try {
        const user = req.user
        let owner;
        if (user) {
            if (user.rol == 'Premium') {
                owner = user.email;
            } else {
                owner = 'Admin';
            }
        } else {
            req.logger.error(`Usuario no encontrado con el correo electrónico: ${email}`);
            return res.status(404).json({ Msg: 'Usuario no encontrado' });
        }

        let thumbnails

        if (req.files.length == 0) {
            thumbnails = {}
        } else {
            thumbnails = {
                one: `http://localhost:${process.env.PORT}/img/products/${req.files[0].filename}`,
                two: `http://localhost:${process.env.PORT}/img/products/${req.files[1].filename}`,
                three: `http://localhost:${process.env.PORT}/img/products/${req.files[2].filename}`,
                four: `http://localhost:${process.env.PORT}/img/products/${req.files[3].filename}`
            };

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
            return res.status(400).json({ Msg: `Error al crear el producto` });
        }

        req.logger.info(`Producto creado con éxito - ID: ${newProduct._id} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(201).redirect('http://localhost:5173/admin');
    } catch (error) {
        req.logger.error(`Error en createProduct: ${error}`);
        return res.status(500).send({ Msg: error });
    }
};


//Mostrar todos los productos/Paginación
export const getProducts = async (req, res) => {
    req.logger.info(`Obteniendo productos - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
    try {
        const { limit = 10, page = 1, sort = '', category = '', brand = '' } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (brand) filter.brand = brand;

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
        };

        if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 };

        const products = await allProducts(filter, options);

        if (!products) {
            req.logger.warning(`No se encontraron productos - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ Msg: 'No se encontraron productos' });
        }

        const status = 'success';
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
        product.arrayPages = pages;
        req.logger.info(`Productos obtenidos con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(200).json(product);
    } catch (error) {
        req.logger.error(`Error en getProducts: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};


//Mostrar un producto
export const getProduct = async (req, res) => {
    req.logger.info(`Obteniendo producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    try {
        const product = await findProductById(req.params.pid);
        if (!product) {
            req.logger.warning(`Producto con ID ${req.params.pid} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ Msg: `Producto no encontrado` });
        }

        req.logger.info(`Producto con ID ${req.params.pid} obtenido con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(200).json(product);
    } catch (error) {
        req.logger.error(`Error en getProduct: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};

//Eliminar un producto
export const deleteProduct = async (req, res) => {
    req.logger.info(`Eliminando producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
    const { email } = req.user
    try {
        const prod = await findProductById(req.params.pid)
        if (prod.owner == email) {
            const deleteById = await delProduct(req.params.pid)
            req.logger.info(`Producto con ID ${req.params.pid} eliminado con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(200).json(deleteById);
        } else if (req.user.rol == 'Admin') {
            const deleteById = await delProduct(req.params.pid)
            req.logger.info(`Producto con ID ${req.params.pid} eliminado con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(200).json(deleteById);
        } else {
            req.logger.warning(`El usuario no tiene permiso para eliminar este producto - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            res.status(400).send({ Msg: `Usuario sin autorizacion para eliminar este producto` })
        }
    } catch (error) {
        req.logger.error(`Error en deleteProduct: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};


//Actualizar un producto
export const updateProduct = async (req, res) => {
    req.logger.info(`Actualizando producto con ID ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    try {
        const { pid } = req.params;
        const updateData = req.body;

        if (updateData.stock > 0) {
            updateData.status = true;
        } else if (updateData.stock === 0) {
            updateData.status = false;
        }

        const updatedProduct = await upProduct(pid, updateData);

        if (!updatedProduct) {
            req.logger.warning(`Producto con ID ${req.params.pid} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ Msg: `Producto no encontrado` });
        }

        req.logger.info(`Producto con ID ${req.params.pid} actualizado con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        req.logger.error(`Error en updateProduct: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};






