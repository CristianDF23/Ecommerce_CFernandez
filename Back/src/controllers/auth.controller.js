import { userNew } from '../services/auth.services.js';
import { insertCart } from '../services/carts.services.js';
import { insertUser, delUser, findUserByEmail, upUser } from '../services/users.services.js';
import { isValidatePassword } from '../utils/bcrypt.js'
import jwt from 'jsonwebtoken'


//Registro de usuario
export const registerUser = async (data) => {
    try {
        const newUser = await userNew(data)
        const user = await insertUser(newUser);
        return user;
    } catch (error) {
        return error
    }
}

//Login de Usuario
export const loginUser = async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
        }

        const validPassword = isValidatePassword(user.password, req.body.password);
        if (!validPassword) {
            return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
        }

        const { _id, email, first_name, last_name, phone, age, cart, rol } = user;
        const token = jwt.sign(
            { email: req.body.email, password: req.body.password, rol: user.rol },
            'ecommerceSecret',
            { expiresIn: '24h' }
        );

        res.cookie('cookieToken', token, {
            maxAge: 60 * 60 * 1000,
            sameSite: 'None',
            secure: true,
            httpOnly: true,
        }).json({ _id, email, first_name, last_name, phone, age, cart, rol, token });
    } catch (error) {
        req.logger.error(`Error en loginUser: ${error}`);
        res.status(500).json({ Error: `Error interno del servidor` });
    }
};

//Login de Usuario con github
export const loginGithub = async (data) => {
    try {
        const newCart = await insertCart();
        let userNew = {
            email: data._json.email,
            first_name: data._json.name,
            rol: 'Usuario',
            cart: newCart[0]._id
        };
        const user = await insertUser(userNew);
        return user;
    } catch (error) {
        return error
    };
};

//Logout de Usuario
export const logout = async (req, res) => {
    try {
        return res.clearCookie('cookieToken').send('Cookie Eliminada');
    } catch (error) {
        req.logger.error(`Error en logout: ${error}`);
        res.status(500).send('Error al eliminar la cookie');
    }
};
//Actualización de Usuario
export const updateUser = async (req, res) => {
    try {
        const updateUs = await upUser(req.params.uid, req.body);
        if (!updateUs) {
            req.logger.warning(`No se pudo actualizar el usuario`);
            return res.status(400).json({ Msg: `Usuario no encontrado` });
        }
        return res.status(200).json(updateUs);
    } catch (error) {
        req.logger.error(`Error en updateUser: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const deleteUs = await delUser(req.params.uid);
        if (!deleteUs) {
            req.logger.warning(`No se pudo eliminar el usuario`);
            return res.status(400).json({ Msg: `Usuario no encontrado` });
        }
        return res.status(200).json(deleteUs);
    } catch (error) {
        req.logger.error(`Error en deleteUser: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};