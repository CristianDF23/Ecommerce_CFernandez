import { userNew } from '../../../services/MongoDb/auth.services.js';
import { insertCart } from '../../../services/MongoDb/carts.services.js';
import { insertUser, deleteUser, findUserByEmailMongoDB, updateUser, getUsers } from '../../../services/MongoDb/users.services.js';
import { isValidatePassword, createHash } from '../../../utils/bcrypt.js'
import { extractedToken } from '../../../utils/cookies.js'
import jwt from 'jsonwebtoken'

export default class UserManagerMongoDB {
    //Registro de usuario
    registerUser = async (data) => {
        try {
            const newUser = await userNew(data)
            const registerUser = await insertUser(newUser);
            return registerUser;
        } catch (error) {
            return error
        }
    }

    //Login de Usuario
    loginUser = async (req, res) => {
        try {
            const isUserFound = await findUserByEmailMongoDB(req.body.email);
            if (!isUserFound) {
                return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
            }

            const validPassword = isValidatePassword(user.password, req.body.password);
            if (!validPassword) {
                return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
            }

            const { _id, email, first_name, last_name, phone, age, cart, rol } = isUserFound;
            const token = jwt.sign(
                { email: req.body.email, password: req.body.password, rol },
                process.env.COOKIE_SECRET,
                { expiresIn: '24h' }
            );

            res.cookie(process.env.COOKIE_USER, token, {
                maxAge: 60 * 60 * 1000,
                sameSite: 'None',
                secure: true,
                httpOnly: true,
            }).json({ _id, email, first_name, last_name, phone, age, cart, rol, token });
        } catch (error) {
            req.logger.error(`Error al intentar iniciar sesión: ${error}`);
            res.status(500).json({ Error: `Error interno del servidor` });
        }
    };

    //Login de Usuario con github
    loginGithub = async (data) => {
        try {
            const createCart = await insertCart();
            let userNew = {
                email: data._json.email,
                first_name: data._json.name,
                rol: 'Usuario',
                cart: createCart[0]._id
            };
            const registerUserGithub = await insertUser(userNew);
            return registerUserGithub;
        } catch (error) {
            return error
        };
    };

    //Logout de Usuario
    logoutUser = async (req, res) => {
        try {
            return res.clearCookie(process.env.COOKIE_USER).send('Cookie Eliminada');
        } catch (error) {
            req.logger.error(`Error al cerrar sesión: ${error}`);
            res.status(500).send('Error al eliminar la cookie');
        }
    };
    //Actualización de Usuario
    updateUser = async (req, res) => {
        try {
            const isUpdateUser = await updateUser(req.params.uid, req.body);
            if (!isUpdateUser) {
                req.logger.warning(`No se pudo actualizar el usuario`);
                return res.status(400).json({ Msg: `Usuario no encontrado` });
            }
            return res.status(200).json(isUpdateUser);
        } catch (error) {
            req.logger.error(`Error al actualizar usuario: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Eliminar usuario
    deleteUser = async (req, res) => {
        try {
            const isDeleteUser = await deleteUser(req.params.uid);
            if (!isDeleteUser) {
                req.logger.warning(`No se pudo eliminar el usuario`);
                return res.status(400).json({ Msg: `Usuario no encontrado` });
            }
            return res.status(200).json(isDeleteUser);
        } catch (error) {
            req.logger.error(`Error al eliminar el usuario: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };

    //Todos los usuarios
    getUsers = async (req, res) => {
        try {
            const userList = await getUsers()
            return res.status(200).json({ userList })
        } catch (error) {
            req.logger.error(`Error al obtener usuarios: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    }

    //Cambiar contraseña
    updatePassword = async (req, res) => {
        const { email, token, password } = req.body;
        req.logger.info(`Solicitud de actualización de contraseña recibida - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        const newToken = extractedToken(token);

        try {
            jwt.verify(newToken, process.env.COOKIE_SECRET);
            req.logger.info(`Token verificado con éxito - Email: ${email} - Token: ${newToken} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            const isUserFound = await findUserByEmailMongoDB(email);
            if (!isUserFound) {
                req.logger.warning(`Usuario no encontrado - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            await updateUser(isUserFound._id, { password: createHash(password) });
            req.logger.info(`Contraseña actualizada con éxito - Email: ${email} - Usuario ID: ${user._id} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

            res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
        } catch (err) {
            req.logger.error(`Error al restablecer contraseña: ${err.message} - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(401).json({ message: 'Token inválido o expirado.' });
        }
    };
    
}