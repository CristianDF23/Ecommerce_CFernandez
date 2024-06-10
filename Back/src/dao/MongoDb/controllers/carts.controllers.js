import { deleteCart, findCartById, insertCart, updateCart } from '../../../services/MongoDb/carts.services.js'
import { findProductById, updateProduct } from '../../../services/MongoDb/products.services.js';

export default class CartManagerMongoDB {

    //Crear carrito nuevo
    createCart = async (req, res) => {
        req.logger.info(`Iniciando la creación del carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isNewCart = await insertCart();
            if (!isNewCart) {
                req.logger.warning(`Error al crear el carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `Error al crear el carrito` });
            } else {
                req.logger.info(`Carrito creado con éxito - ID: ${isNewCart[0]._id} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(201).json(isNewCart);
            }
        } catch (error) {
            req.logger.error(`Error al crear carrito en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Agregar producto al carrito
    addProductToCart = async (req, res) => {
        req.logger.info(`Iniciando el proceso para agregar productos al carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        
        const user = req.user
        
        try {
            const isProductFound = await findProductById(req.params.pid);
            const isCartFound = await findCartById(req.params.cid);
            if (!isProductFound) {
                req.logger.warning(`No se encontró el producto - ID: ${req.params.pid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el producto` });
            }

            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            }

            if (isProductFound.owner == user.email) {
                req.logger.warning(`No se puede agregar el producto al carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se puede agregar el producto al carrito` });
            } else {
                const existingItem = isCartFound.products.findIndex(item => item.product.id == req.params.pid);
                if (existingItem === -1) {
                    isCartFound.products.push({ product: req.params.pid, quantity: 1 });
                    req.logger.info(`Producto añadido al carrito - Producto ID: ${req.params.pid}, Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                } else {
                    isCartFound.products[existingItem].quantity += 1;
                    req.logger.info(`Cantidad de producto incrementada - Producto ID: ${req.params.pid}, Carrito ID: ${req.params.cid}, Nueva cantidad: ${cart.products[existingItem].quantity} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                }

                await updateCart(req.params.cid, isCartFound);
                req.logger.info(`Carrito actualizado - Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(201).json(isCartFound);
            }
        } catch (error) {
            req.logger.error(`Error al agregar producto en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }

    };


    //Mostrar productos del carrito
    getProductsCart = async (req, res) => {
        req.logger.info(`Iniciando el proceso para obtener productos del carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartFound = await findCartById(req.params.cid);
            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            } else {
                req.logger.info(`Carrito encontrado - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(200).json(isCartFound);
            }
        } catch (error) {
            req.logger.error(`Error al obtener productos en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };


    //Eliminar carrito
    deleteCart = async (req, res) => {
        req.logger.info(`Iniciando el proceso para eliminar el carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartDelete = await deleteCart(req.params.cid);
            if (!isCartDelete) {
                req.logger.warning(`No se pudo eliminar el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se pudo eliminar el carrito` });
            } else {
                req.logger.info(`Carrito eliminado correctamente - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(200).json({ Msg: `Carrito eliminado correctamente` });
            }
        } catch (error) {
            req.logger.error(`Error al eliminar carrito en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Eliminar un producto del carrito
    deleteProductCart = async (req, res) => {
        req.logger.info(`Iniciando el proceso para eliminar un producto del carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartFound = await findCartById(req.params.cid);
            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            }

            const existingItem = isCartFound.products.findIndex(item => item._id == req.params.pid);
            if (existingItem === -1) {
                req.logger.warning(`No se encontró el producto - ID: ${req.params.pid}, Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el producto` });
            }

            isCartFound.products.splice(existingItem, 1);
            await isCartFound.save();

            req.logger.info(`Producto eliminado del carrito - Producto ID: ${req.params.pid}, Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            return res.status(200).json(isCartFound);
        } catch (error) {
            req.logger.error(`Error al eliminar producto en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };


    //Eliminar todos los productos del carrito
    deleteAllProductsCart = async (req, res) => {
        req.logger.info(`Iniciando el proceso para eliminar todos los productos del carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartFound = await findCartById(req.params.cid);
            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            }

            isCartFound.products = [];
            await isCartFound.save();

            req.logger.info(`Productos eliminados correctamente - Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            return res.status(200).json({ Msg: `Productos eliminados correctamente`, cart });
        } catch (error) {
            req.logger.error(`Error al eliminar los productos ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };


    //Actualizar la cantidad de un producto
    updateQuantityOfProduct = async (req, res) => {
        req.logger.info(`Iniciando el proceso para actualizar la cantidad de un producto en el carrito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartFound = await findCartById(req.params.cid);
            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            }

            const productIndex = isCartFound.products.findIndex(i => i._id == req.params.pid);
            console.log(req.params.pid);
            if (productIndex === -1) {
                req.logger.warning(`No se encontró el producto - ID: ${req.params.pid}, Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el producto` });
            }

            isCartFound.products[productIndex].quantity = req.body.quantity;
            await isCartFound.save();

            req.logger.info(`Cantidad de producto actualizada en el carrito - Producto ID: ${req.params.pid}, Carrito ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            return res.status(200).json(isCartFound);
        } catch (error) {
            req.logger.error(`Error al actualizar cantidad en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Finalizar Compra
    completePurchase = async (req, res) => {
        req.logger.info(`Iniciando el proceso de compra - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        try {
            const isCartFound = await findCartById(req.params.cid);
            if (!isCartFound) {
                req.logger.warning(`No se encontró el carrito - ID: ${req.params.cid} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(400).json({ Msg: `No se encontró el carrito` });
            }

            const arrayProducts = isCartFound.products;
            const updateStockProducts = arrayProducts.filter(elem => elem.product.stock >= elem.quantity);
            const updateProductsCart = arrayProducts.filter(elem => elem.product.stock < elem.quantity);
            isCartFound.products = updateProductsCart;
            await updateCart(req.params.cid, isCartFound);

            for (const productItem of updateStockProducts) {
                productItem.product.stock -= productItem.quantity;
                if (productItem.product.stock == 0) {
                    productItem.product.status = false;
                    await updateProduct(productItem.product._id, { stock: productItem.product.stock, status: productItem.product.status });
                }
                await updateProduct(productItem.product._id, { stock: productItem.product.stock });
            }

            req.logger.info(`Compra completada con éxito - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            res.status(200).json(cart);
        } catch (error) {
            req.logger.error(`Error al completar la compra en ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()} --> ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };
}
