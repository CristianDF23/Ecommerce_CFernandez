import { Router } from 'express'
import passport from 'passport'
import { authController } from '../services/factory.js'
import { authorization } from '../middleware/authorization.js'
import { documents } from '../utils/multer.js'

const routerAuth = Router()

routerAuth.post('/register', passport.authenticate('register', { failureMessage: 'El usuario ya existe', }), (req, res) => {
    return res.status(201).json(req.user)
});

routerAuth.post('/login', authController.loginUser)

routerAuth.get('/profile', passport.authenticate('jwt', { session: false }), authorization('Usuario'), (req, res) => {
    return res.json({ email: req.user.email, rol: req.user.rol })
}
)

routerAuth.get('/github', passport.authenticate('github', {}), (req, res) => { })

routerAuth.get('/callbackGithub', passport.authenticate('github', {}), (req, res) => {
    req.session.user = req.user
    return res.status(201).send({ Msg: `Usuario registrado correctamente` })
})

routerAuth.get('/logout', authController.logoutUser)

routerAuth.put('/premium/:uid', authController.updateUserRol)

routerAuth.post('/:uid/documents', documents.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'product', maxCount: 4 },
    { name: 'documents', maxCount: 3 }]), authController.updateDocumets)

routerAuth.put('/:uid', authController.updateUser)

routerAuth.delete('/:uid', authController.deleteUser)

routerAuth.get('/', authController.getUsers)

routerAuth.post('/restorePassword', authController.updatePassword)

export default routerAuth
