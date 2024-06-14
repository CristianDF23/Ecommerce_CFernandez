import userModel from '../../dao/MongoDb/models/users.models.js'

//Crear Usuario
export const insertUser = async (user) => {
    try {
        return await userModel.insertMany(user);
    } catch (error) {
        console.log(error);
    };
};

//Buscar usuario por su email
export const findUserByEmailMongoDB = async (email) => {
    try {
        return await userModel.findOne({email: email});
    } catch (error) {
        console.log(error);
    };
};

export const findUserByIdMongoDB = async (uid) => {
    try {
        return await userModel.findById(uid);
    } catch (error) {
        console.log(error);
    };
};

//Eliminar Usuario
export const deleteUser = async (uid) => {
    try {
        const user = await userModel.findByIdAndDelete(uid);
        return user
    } catch (error) {
        console.log(error);
    };
};


//Actualizar Usuario
export const updateUser = async (uid, user) =>{
    try {
        return await userModel.findByIdAndUpdate(uid, user, {new: true});
    } catch (error) {
        console.log(error);
    };
};

//Todos los usuarios
export const getUsers = async () =>{
    try {
        return await userModel.find().select('-password')
    } catch (error) {
        console.log(error);
    }
}