import ticketModels from '../../dao/MongoDb/models/ticket.models.js';
import { transporter } from "../../config/nodemailer.js";
import { mailTicket } from "../../utils/mailTicket.js";
import { mailPassword } from '../../utils/mailPassword.js'
import { appLogger } from '../../config/loggers.js';


//Crear Ticket
export const createTicket = async (ticket) => {
    try {
        const newTicket = await ticketModels.insertMany(ticket);
        return newTicket
    } catch (error) {
        console.log(error);
    };
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
        console.log('Correo enviado:', emailResponse.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};