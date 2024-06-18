import { userNew, extractedToken } from '../services/auth.services.js';
import { insertCart } from '../services/carts.services.js';
import { insertUser, delUser, findUserByEmail, upUser, allUsers, findUserById } from '../services/users.services.js';
import { isValidatePassword, createHash } from '../utils/bcrypt.js'
import {deletedAccount} from '../services/mail.services.js'
import {appLogger} from '../config/loggers.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

//Registro de usuario
export const registerUser = async (data) => {
    try {
        const newUser = await userNew(data)
        const registerUser = await insertUser(newUser);
        appLogger.info(`Usuario registrado correctamente`)
        return registerUser;
    } catch (error) {
        appLogger.error(`Error al registrar el usuario: ${error}`)
        return error
    }
}

//Login de Usuario
export const loginUser = async (req, res) => {
    try {
        let userEmail = req.body.email
        const isUserFound = await findUserByEmail(userEmail);
        if (!isUserFound) {
            req.logger.error(`Usuario y/o Contraseña incorrecta`);
            return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
        }

        const validPassword = isValidatePassword(isUserFound.password, req.body.password);
        if (!validPassword) {
            req.logger.error(`Usuario y/o Contraseña incorrecta`);
            return res.status(401).json({ Error: `Usuario y/o Contraseña incorrecta` });
        }
        const { _id, email, first_name, last_name, phone, age, cart, rol } = isUserFound;

        const lastConnection = moment().format('YYYY-MM-DD');
        await upUser(isUserFound._id, { last_connection: lastConnection });

        const token = jwt.sign(
            { email: req.body.email, password: req.body.password, rol },
            process.env.COOKIE_SECRET,
            { expiresIn: '24h' }
        );
        req.logger.info(`Inicio de sesion exitoso`);
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
export const logoutUser = async (req, res) => {
    try {
        const isUserFound = await findUserByEmail(req.body.email);
        console.log(req.body.email);
        if (!isUserFound) {
            return res.status(401).json({ Error: `Usuario no encontrado` });
        }

        const lastConnection = moment().format('YYYY-MM-DD');

        await upUser(isUserFound._id, { last_connection: lastConnection });
        req.logger.info(`Sesion finalizada correctamente`);
        return res.status(200).clearCookie(process.env.COOKIE_USER).send('Sesion cerrada correctamente');
    } catch (error) {
        req.logger.error(`Error al cerrar sesión: ${error}`);
        res.status(500).send('Error al eliminar la cookie');
    }
};
//Actualización de Usuario
export const updateUser = async (req, res) => {
    try {
        const isUpdateUser = await upUser(req.params.uid, req.body);
        if (!isUpdateUser) {
            req.logger.warning(`No se pudo actualizar el usuario`);
            return res.status(400).json({ Msg: `Usuario no encontrado` });
        }
        req.logger.info(`Usuario actualizado correctamente`);
        return res.status(200).json(isUpdateUser);
    } catch (error) {
        req.logger.error(`Error al actualizar usuario: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const getAllUsers = await allUsers();
        for (const user of getAllUsers) {
            const userLastConnection = moment(user.last_connection);
            const currentDay = moment();
            const daysDisconnected = currentDay.diff(userLastConnection, 'days');
            
            if (daysDisconnected > 2) {
                await delUser(user._id);
                await deletedAccount(user.email)
            }
        }
        return res.status(200).json(getAllUsers);

    } catch (error) {
        req.logger.error(`Error al eliminar el usuario: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};

//Todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const userList = await allUsers()
        return res.status(200).json({ userList })
    } catch (error) {
        req.logger.error(`Error al obtener usuarios: ${error}`);
        return res.status(500).json({ Msg: error });
    }
}

//Cambiar contraseña
export const updatePassword = async (req, res) => {
    const { email, token, password } = req.body;
    req.logger.info(`Solicitud de actualización de contraseña recibida - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    const newToken = extractedToken(token);

    try {
        jwt.verify(newToken, process.env.COOKIE_SECRET);
        req.logger.info(`Token verificado con éxito - Email: ${email} - Token: ${newToken} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        const isUserFound = await findUserByEmail(email);
        if (!isUserFound) {
            req.logger.warning(`Usuario no encontrado - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await upUser(isUserFound._id, { password: createHash(password) });
        req.logger.info(`Contraseña actualizada con éxito - Email: ${email} - Usuario ID: ${user._id} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
    } catch (err) {
        req.logger.error(`Error al restablecer contraseña: ${err.message} - Email: ${email} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

export const updateDocumets = async (req, res) => {
    try {

        const userId = req.params.uid
        const files = req.files;

        const isUserFound = await findUserById(userId);
        if (!isUserFound) {
            req.logger.warning(`Usuario no encontrado - ID: ${userId} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const documentArray = [];
        if (files.profile) {
            const file = files.profile[0];
            const nameWithoutExt = file.originalname.split('.').slice(0, -1).join('.');
            documentArray.push({
                name: nameWithoutExt,
                reference: file.path
            });
        }
        if (files.product) {
            files.product.forEach(file => {
                const nameWithoutExt = file.originalname.split('.').slice(0, -1).join('.');
                documentArray.push({
                    name: nameWithoutExt,
                    reference: file.path
                });
            });
        }
        if (files.documents) {
            files.documents.forEach(file => {
                const nameWithoutExt = file.originalname.split('.').slice(0, -1).join('.');
                documentArray.push({
                    name: nameWithoutExt,
                    reference: file.path
                });
            });
        }

        isUserFound.documents = isUserFound.documents.concat(documentArray);
        await isUserFound.save();

        res.status(200).send('Documentacion actualizada con exito.');
    } catch (error) {
        res.status(500).send('Error al actualizar los documentos: ' + error.message);
    }
}

export const updateUserRol = async (req, res) => {
    try {
        const userId = req.params.uid;
        console.log(req.params.uid);
        const isUserFound = await findUserById(userId);

        if (!isUserFound) {
            req.logger.warning(`Usuario no encontrado - ID: ${userId} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        const uploadedDocuments = isUserFound.documents.map(doc => doc.name);
        const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

        if (!hasAllDocuments) {
            return res.status(400).send('Documentacion faltante, agregue todos los documentos');
        }

        await upUser(isUserFound._id, {rol: 'Premium'})

        res.status(200).send('Rol de usuario actualizado correctamente.');
    } catch (error) {
        res.status(500).send('Error al actualizar el rol de usuario: ' + error.message);
    }
};