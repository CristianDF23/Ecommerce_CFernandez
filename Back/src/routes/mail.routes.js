import { Router } from 'express'
import { insertTicket } from '../controllers/mail.controllers.js';

const routerMail = Router();

routerMail.post('/newTicket', insertTicket)

export default routerMail;