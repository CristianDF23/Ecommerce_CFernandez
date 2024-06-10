import { Router } from 'express'
import {mailController} from '../services/factory.js'

const routerMail = Router();

routerMail.post('/newTicket', mailController.insertTicket)
routerMail.post('/generateToken', mailController.tokenRestorePassword)

export default routerMail;