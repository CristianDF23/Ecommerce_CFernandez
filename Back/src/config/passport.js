import passport from "passport";
import local from 'passport-local';
import github from 'passport-github'
import jwt from "passport-jwt";

import { ExtractJwt } from "passport-jwt";
import { authController, findUser } from '../services/factory.js'
import { cookieExtractor } from "../utils/cookies.js";

export const initPassport = () => {
    passport.use('register', new local.Strategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const existingUser = await findUser(req.body.email);
                if (existingUser) {
                    return done(null, false, 'El usuario ya existe');
                }
                const newUser = await authController.registerUser(req.body)
                return done(null, newUser);
            } catch (error) {
                done('Error al registrar el usuario', error);
            };
        }
    ))

    passport.use('jwt', new jwt.Strategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.COOKIE_SECRET
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
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/api/auth/callbackGithub'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await findUser(profile._json.email)
                if (user) {
                    return done(null, false, 'El usuario ya existe');
                };
                const newUser = await authController.loginGithub(profile)
                return done(null, newUser);
            } catch (error) {
                return done(error)
            };
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

