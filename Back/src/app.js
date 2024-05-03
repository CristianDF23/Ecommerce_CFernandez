import express from 'express';
import cors from 'cors'
import { dbConnect } from './config/mongoDB.js'
import routerIndex from './routes/index.routes.js';
import MongoStore from "connect-mongo";
import session from 'express-session'
import { initPassport } from './config/passport.js';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import { __dirname } from "./path.js"
import { commandAndDotenvConfig } from './config/command.dotenv.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};
commandAndDotenvConfig()
//PUBLIC
app.use(express.static(__dirname + "/public"))

app.use(cors(corsOptions));

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
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

app.use(routerIndex)

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en PUERTO: ${PORT}`);
    dbConnect()
});