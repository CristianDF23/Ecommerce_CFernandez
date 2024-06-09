import { v4 as uuidv4 } from 'uuid';
import { insertCart } from '../FileSystem/carts.services.js'
import { createHash } from '../../utils/bcrypt.js';

export const userNew = async (data) => {

    let rol = 'Usuario';
    if (data.email === process.env.ADMIN_USER && data.password === process.env.ADMIN_PASS) {
        rol = 'Admin';
    }

    const newCart = await insertCart();
    const user = {
        id: uuidv4(),
        email: data.email,
        password: createHash(data.password),
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        age: data.age,
        rol,
        cart: newCart.id
    };
    return user;
};