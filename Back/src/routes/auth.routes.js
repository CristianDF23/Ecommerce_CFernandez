import { Router } from "express";
import passport from "passport";
import { deleteUser, loginUser, logout, updateUser } from "../controllers/auth.controller.js";
import { authorization } from "../middleware/authorization.js";


const routerAuth = Router();

routerAuth.post('/register', passport.authenticate('register', { failureMessage: 'El usuario ya existe' }), (req, res) => {
    return res.status(201).redirect('http://localhost:5173/');
})

routerAuth.post('/login', loginUser);

routerAuth.get('/profile', passport.authenticate('jwt', { session: false }), authorization('Usuario'), (req, res) => {
    return res.json({ email: req.user.email, rol: req.user.rol })
})

routerAuth.get('/github', passport.authenticate('github', {}), (req, res) => { });

routerAuth.get('/callbackGithub', passport.authenticate('github', {}), (req, res) => {
    req.session.user = req.user;
    return res.status(201).send({ Msg: `Usuario registrado correctamente` });
});

routerAuth.get('/logout', logout);
routerAuth.put('/:uid', updateUser)
routerAuth.delete('/:uid', deleteUser)

export default routerAuth;