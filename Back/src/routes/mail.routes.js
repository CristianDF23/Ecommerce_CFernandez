import { Router } from 'express'
import { insertTicket, restorePassword } from '../controllers/mail.controllers.js';

const routerMail = Router();

routerMail.post('/newTicket', insertTicket)
routerMail.get('/restorePassword', restorePassword)

export default routerMail;