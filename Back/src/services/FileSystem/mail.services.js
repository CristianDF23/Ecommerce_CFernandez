import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import  __dirname  from '../../path.js';
import { transporter } from "../../config/nodemailer.js";
import { mailTicket } from "../../utils/mailTicket.js";
import { mailPassword } from '../../utils/mailPassword.js'
import {appLogger} from '../../config/loggers.js'

const filePath = `${__dirname}/dao/FileSystem/files/tickets.json`

export const createTicket = async (ticket) => {
    try {
        let tickets = [];
        if (fs.existsSync(filePath)) {
            const res = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
            tickets = res;
        }
        ticket._id = uuidv4();
        tickets.push(product);
        await fs.promises.writeFile(filePath, JSON.stringify(tickets, null, 2), 'utf-8');
        return tickets;
    } catch (error) {
        appLogger.error('Error al insertar el ticket:', error);
        return null;
    }
};

export const sendTicket = async (ticket, products, emailUser) => {
    try {
        const email = await transporter.sendMail({
            from: 'CSport <cristian.eam85@gmail.com>',
            to: emailUser,
            subject: 'Gracias por tu compra!',
            html: mailTicket(ticket, products),
        });
        appLogger.info('Correo enviado:', email.response);
    } catch (error) {
        appLogger.error('Error al enviar el correo:', error);
    }
};

export const sendRestorePassword = async (userEmail, token) => {
    try {
        const emailResponse = await transporter.sendMail({
            from: 'CSport <cristian.eam85@gmail.com>',
            to: userEmail,
            subject: 'Restablecer contraseña',
            html: mailPassword(token)
        });
        appLogger.info('Correo enviado:', emailResponse.response);
    } catch (error) {
        appLogger.error('Error al enviar el correo:', error);
    }
};