import fs from 'fs';
import  __dirname  from '../../path.js';

const filePath = `${__dirname}/dao/FileSystem/files/users.json`

//Crear Usuario
export const insertUser = async (user) => {
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const usersData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(usersData);
        }
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        return user;
    } catch (error) {
        console.log(error);
    }
};

//Buscar usuario por su email
export const findUserByEmailFS = async (email) => {
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const usersData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(usersData);
        }
        return users.find(u => u.email === email);
    } catch (error) {
        console.log(error);
    }
};

//Eliminar Usuario
export const delUser = async (uid) => {
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const usersData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(usersData);
        }
        const deletedUser = users.find(u => u.id === uid);
        users = users.filter(u => u.id !== uid);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        return deletedUser;
    } catch (error) {
        console.log(error);
    }
};

//Actualizar Usuario
export const upUser = async (uid, updatedUser) => {
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const usersData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(usersData);
        }
        const index = users.findIndex(u => u.id === uid);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            return users[index];
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.log(error);
    }
};


//Todos los usuarios
export const allUsers = async () => {
    try {
        let users = [];
        if (fs.existsSync(filePath)) {
            const usersData = fs.readFileSync(filePath, 'utf8');
            users = JSON.parse(usersData);
        }
        return users.map(u => ({ ...u, password: '***' }));
    } catch (error) {
        console.log(error);
    }
};
