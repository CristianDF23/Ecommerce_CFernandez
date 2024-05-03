import { delCart, findCartById, insertCart, upCart } from '../services/carts.services.js'
import { findProductById } from '../services/products.services.js';
import { upProduct } from '../services/products.services.js';
import {sendTicket} from '../controllers/mail.controllers.js'

//Crear carrito nuevo
export const createCart = async (req, res) => {
    try {
        const newCart = await insertCart();
        if (!newCart) {
            return res.status(400).json({ Msg: `Error al crear el carrito` });
        } else {
            return res.status(201).json(newCart);
        };
    } catch (error) {
        console.log(error);
    };
};

//Agregar producto al carrito
export const addProducts = async (req, res) => {
    try {
        const product = await findProductById(req.params.pid);
        const cart = await findCartById(req.params.cid);
        if (!product) {
            return res.status(400).json({ Msg: `No se encontró el producto` });
        };
        if (!cart) {
            return res.status(400).json({ Msg: `No se encontró el carrito` });
        };
        const existingItem = cart.products.findIndex(item => item.product.id == req.params.pid);
        if (existingItem === -1) {
            cart.products.push({ product: req.body.pid, quantity: 1 });
        } else {
            cart.products[existingItem].quantity += 1;
        };
        await upCart(req.params.cid, cart);
        return res.status(201).json(cart);
    } catch (error) {
        console.log(error);
    };
};

//Mostrar productos del carrito
export const getCartProducts = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid);
        if (!cart) {
            return res.status(400).json({ Msg: `No se encontró el carrito` });
        } else {
            return res.status(201).json(cart);
        };
    } catch (error) {
        console.log(error);
    };
};

//Eliminar carrito
export const deleteCart = async (req, res) => {
    try {
        const cart = await delCart(req.params.cid);
        if (!cart) {
            return res.status(400).json({ Msg: `No se pudo eliminar el carrito` });
        } else {
            return res.status(200).json({ Msg: `Carrito eliminado correctamente` });
        };
    } catch (error) {
        console.log(error);
    };
};

//Eliminar un producto del carrito
export const deleteProductOfCart = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid);
        if (!cart) {
            return res.status(400).json({ Msg: `No se encontró el carrito` });
        };
        const existingItem = cart.products.findIndex(item => item._id == req.params.pid);
        if (existingItem === -1) {
            return res.status(400).json({ Msg: `No se encontró el producto` });
        };
        cart.products.splice(existingItem, 1);
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
    };
};

//Eliminar todos los productos del carrito
export const deleteAllProducts = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid);
        if (!cart) {
            return res.status(400).json({ Msg: `No se encontró el carrito` });
        }
        cart.products = [];
        await cart.save()
        return res.status(200).json({ Msg: `Productos eliminados correctamente`, cart });
    } catch (error) {
        console.log(error);
    };
};

//Actualizar la cantidad de un producto
export const updateQuantity = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid);
        if (!cart) {
            return res.status(400).json({ Msg: `No se encontró el carrito` });
        };
        const productIndex = cart.products.findIndex(i => i._id == req.params.pid);
        if (productIndex === -1) {
            return res.status(400).json({ Msg: `No se encontró el producto` });
        };
        cart.products[productIndex].quantity = req.body.quantity;
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
    };
};


//Finalizar Compra
export const purchase = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid);
        const arrayProducts = cart.products;
        const updateStock = arrayProducts.filter(elem => elem.product.stock >= elem.quantity)
        const updateCart = arrayProducts.filter(elem => elem.product.stock < elem.quantity)
        cart.products = updateCart
        await upCart(req.params.cid, cart)
        for (const productItem of updateStock) {
            productItem.product.stock -= productItem.quantity;
            await upProduct(productItem.product._id, { stock: productItem.product.stock });
        }
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al procesar la compra' });
    }
};
