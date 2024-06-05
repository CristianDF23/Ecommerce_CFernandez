import MongoSingleton from '../config/mongoDB.js'
import config from '../config/command.dotenv.js'

const persistence = config.persistence

let productController = null
let cartController = null
let authController = null
let findUser = null

async function connectMongo() {
    console.log("Iniciando servicio para MongoDB!!");
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1);
    }
}

switch (persistence) {
    case 'mongoDB':
        connectMongo()
        const { default: ProductManagerMongoDB } = await import('../dao/MongoDb/controllers/products.controllers.js')
        const { default: CartManagerMongoDB } = await import('../dao/MongoDb/controllers/carts.controllers.js')
        const { default: UserManagerMongoDB } = await import('../dao/MongoDb/controllers/auth.controller.js')
        const { default: findUserByEmailMongoDB } = await import('../services/MongoDb/users.services.js')
        productController = new ProductManagerMongoDB()
        cartController = new CartManagerMongoDB()
        authController = new UserManagerMongoDB()
        findUser = findUserByEmailMongoDB
        break;

    case 'fileSystem':
        const { default: ProductManagerFS } = await import('../dao/FileSystem/controllers/products.controllers.js')
        const { default: CartManagerFS } = await import('../dao/FileSystem/controllers/carts.controllers.js')
        const { default: UserManagerFS } = await import('../dao/FileSystem/controllers/auth.controller.js')
        const { default: findUserByEmailFS } = await import('../services/FileSystem/users.services.js')
        productController = new ProductManagerFS()
        cartController = new CartManagerFS()
        authController = new UserManagerFS()
        findUser = findUserByEmailFS
        break;

    default:
        break;
}

export { productController, cartController, authController, findUser }
