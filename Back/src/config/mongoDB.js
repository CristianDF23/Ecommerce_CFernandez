import {connect} from 'mongoose';

export const dbConnect = async () =>{
    try {
        await connect(process.env.DB_URL);
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(`Error al conectarse a la base de datos: ${error}`);
    }
}