import MongoSingleton from '../config/mongoDB.js'
import config from '../config/command.dotenv.js'
import { findUserByEmailMongoDB } from '../services/MongoDb/users.services.js';
import { findUserByEmailFS } from '../services/FileSystem/users.services.js';
import { appLogger } from '../config/loggers.js';

const persistence = config.persistence

let productController = null
let cartController = null
let authController = null
let mailController = null
let findUser = null

async function connectMongo() {
    appLogger.info("Iniciando servicio para MongoDB");
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        appLogger.error("Error al iniciar MongoDB:", error);
        process.exit(1);
    }
}

switch (persistence) {
    case 'mongoDB':
        connectMongo()
        const { default: ProductManagerMongoDB } = await import('../dao/MongoDb/controllers/products.controllers.js')
        const { default: CartManagerMongoDB } = await import('../dao/MongoDb/controllers/carts.controllers.js')
        const { default: UserManagerMongoDB } = await import('../dao/MongoDb/controllers/auth.controllers.js')
        const { default: MailManagerMongoDB } = await import('../dao/MongoDb/controllers/mail.controllers.js')
        productController = new ProductManagerMongoDB()
        cartController = new CartManagerMongoDB()
        authController = new UserManagerMongoDB()
        mailController = new MailManagerMongoDB()
        findUser = findUserByEmailMongoDB
        break;

    case 'fileSystem':
        const { default: ProductManagerFS } = await import('../dao/FileSystem/controllers/products.controllers.js')
        const { default: CartManagerFS } = await import('../dao/FileSystem/controllers/carts.controllers.js')
        const { default: UserManagerFS } = await import('../dao/FileSystem/controllers/auth.controller.js')
        const { default: MailManagerFS } = await import('../dao/FileSystem/controllers/mail.controllers.js')
        productController = new ProductManagerFS()
        cartController = new CartManagerFS()
        authController = new UserManagerFS()
        mailController = new MailManagerFS()
        findUser = findUserByEmailFS
        break;

    default:
        break;
}

export { productController, cartController, authController, mailController, findUser }
