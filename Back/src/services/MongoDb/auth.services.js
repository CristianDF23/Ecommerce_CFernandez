import { createHash } from "../../utils/bcrypt.js"
import { insertCart } from "./carts.services.js"
import { capitalizarPrimeraLetra } from "../../services/DTO.services.js"

export const userNew = async (data) => {
    if (data.email === process.env.ADMIN_USER && data.password === process.env.ADMIN_PASS) {
        userNew.rol = 'Admin';
    };
    const newCart = await insertCart();
    const user = {
        email: data.email,
        password: createHash(data.password),
        first_name: capitalizarPrimeraLetra(data.first_name),
        last_name: capitalizarPrimeraLetra(data.last_name),
        phone: data.phone,
        age: data.age,
        rol: 'Usuario',
        cart: newCart[0]._id
    }
    return user
};

