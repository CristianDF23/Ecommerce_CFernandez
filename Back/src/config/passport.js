import passport from "passport";
import local from 'passport-local';
import github from 'passport-github'
import jwt from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import usersModels from "../models/users.models.js";
import { findUserByEmail } from "../services/users.services.js";
import { loginGithub, registerUser } from "../controllers/auth.controller.js";
import { cookieExtractor } from "../services/auth.services.js";


export const initPassport = () => {
    //Registro de Usuario
    passport.use('register', new local.Strategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await findUserByEmail(req.body.email)
                if (user) {
                    return done(null, false, 'El usuario ya existe');
                };
                const newUser = await registerUser(req.body)
                return done(null, newUser);
            } catch (error) {
                done('Error al registrar el usuario', error);
            };
        }
    ))

    passport.use('jwt', new jwt.Strategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: 'ecommerceSecret'
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload);
            } catch (err) {
                return done(null, err);
            }
        }
    ));


    passport.use('github', new github.Strategy(
        {
            clientID: 'Iv1.bd3ccc0156b1e78b',
            clientSecret: '57a83f5fcb9ad3df11691ca26c0b01bcaaa5aaf1',
            callbackURL: 'http://localhost:8080/api/auth/callbackGithub'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await findUserByEmail(profile._json.email)
                if (user) {
                    return done(null, false, 'El usuario ya existe');
                };
                const newUser = await loginGithub(profile)
                return done(null, newUser);
            } catch (error) {
                return done(error)
            };
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        let user = usersModels.findById(id);
        done(null, user);
    });
};

