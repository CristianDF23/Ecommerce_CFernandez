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
        return false;
    };
};

//Login de Usuario
export const loginUser = async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        const { _id, email, first_name, last_name, phone, age, cart, rol } = user
        console.log(_id);
        if (user) {
            const validPassword = isValidatePassword(user.password, req.body.password);
            if (validPassword) {
                let token = jwt.sign(
                    { email: req.body.email, password: req.body.password, rol: user.rol },
                    'ecommerceSecret',
                    { expiresIn: '24h' }
                )
                res.cookie('cookieToken', token, {
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'None',
                    secure: true,
                    httpOnly: true,
                }).json({ _id, email, first_name, last_name, phone, age, cart, rol, token })
            } else {
                res.status(401).send({ Error: `Usuario y/o Contraseña incorrecta` })
            }
        }
    } catch (error) {
        console.log(error);
    };
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
        console.log('Error encontrado: \n', error);
        return false
    };
};

//Logout de Usuario
export const logout = async (req, res) => {
    try {
        return res.clearCookie('cookieToken').send('Cookie Eliminada')
    } catch (error) {
        console.log('Error encontrado: \n', error);
    };
};

//Actualización de Usuario
export const updateUser = async (req, res) => {
    try {
        const updateUs = await upUser(req.params.uid, req.body);
        if (!updateUs) {
            return res.status(400).json({ Msg: `Usuario no encontrado` });
        } else {
            return res.status(200).json(updateUs);
        };
    } catch (error) {
        console.log(error);
    };
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const deleteUs = await delUser(req.params.uid);
        if (!deleteUs) {
            return res.status(400).json({ Msg: `Usuario no encontrado` });
        } else {
            return res.status(200).json(deleteUs)
        };
    } catch (error) {
        console.log(error);
    };
};