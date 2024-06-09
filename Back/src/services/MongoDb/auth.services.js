import { createHash } from "../../utils/bcrypt.js"
import { insertCart } from "./carts.services.js"

export const userNew = async (data) => {
    let rol = 'Usuario';
    
    if (data.email === process.env.ADMIN_USER && data.password === process.env.ADMIN_PASS) {
        rol = 'Admin';
    }
    
    const newCart = await insertCart();
    const user = {
        email: data.email,
        password: createHash(data.password),
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        age: data.age,
        rol,
        cart: newCart[0]._id
    }
    return user
};

