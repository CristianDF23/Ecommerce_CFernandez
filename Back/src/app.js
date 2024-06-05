import express from 'express';
import MongoStore from "connect-mongo";
import cors from 'cors'
import routerIndex from './routes/index.routes.js';
import passport from 'passport';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import config from './config/command.dotenv.js';

import { initPassport } from './config/passport.js';
import { addLogger } from './config/loggers.js';

const app = express();

app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};

app.use(cors(corsOptions));

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(passport.session());
initPassport();
app.use(passport.initialize());

//Swagger Config

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Documentación API E-commerce',
            description: 'Documentacion de E-commerce'
        }
    },
    apis: ['./src/docs/**/*.yaml']
}
const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(addLogger);

app.use(routerIndex);

let PORT = config.port;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en PUERTO: ${PORT}`);
});