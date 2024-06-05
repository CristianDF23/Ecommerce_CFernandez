import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import  __dirname  from '../../path.js';

const filePath = `${__dirname}/dao/FileSystem/files/carts.json`

// Función crear carrito
export const insertCart = async () => {
    try {
        let carts = [];
        if (fs.existsSync(filePath)) {
            const res = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
            carts = res;
        }
        const newCart = { _id: uuidv4(), products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(filePath, JSON.stringify(carts, null, 2), 'utf-8');
        return newCart;
    } catch (error) {
        console.error('Error al insertar el carrito:', error);
        return null;
    }
};

export const findCartById = async (cartId) => {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const data = fs.readFileSync(filePath);
    const carts = JSON.parse(data);
    return carts.find(cart => cart.id === cartId);
};

export const upCart = async (cartId, updatedCart) => {
    const carts = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
        carts[cartIndex] = updatedCart;
    } else {
        carts.push(updatedCart);
    }
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
};


// Función para eliminar un carrito por ID
export const delCart = async (cartId) => {
    const cartsFilePath = path.join(__dirname, 'carts.json');
    if (!fs.existsSync(cartsFilePath)) {
        return null;
    }
    const data = fs.readFileSync(cartsFilePath);
    const carts = JSON.parse(data);
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
        const deletedCart = carts.splice(cartIndex, 1)[0];
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
        return deletedCart;
    } else {
        return null;
    }
};
