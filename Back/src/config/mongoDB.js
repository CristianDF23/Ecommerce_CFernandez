import { connect } from 'mongoose';

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
    };

    static getInstance() {
        if (this.#instance) {
            console.log("Ya se ha abierto una conexion a MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectMongoDB = async () => {
        try {
            await connect(
                process.env.DB_URL,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    w: 1,
                }
            );
            console.log("Conectado con exito a MongoDB usando Moongose.");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    };
};


// export const dbConnect = async () => {
//     try {
//         await connect(process.env.DB_URL);
//         console.log('Base de datos conectada');
//     } catch (error) {
//         console.log(`Error al conectarse a la base de datos: ${error}`);
//     }
// }
