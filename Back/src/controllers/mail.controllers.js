import { transporter } from "../../../config/nodemailer.js";
import { mailTicket } from "../../../utils/mailTicket.js";
import { mailPassword } from '../../../utils/mailPassword.js'
import { createTicket } from "../services/mail.services.js";
import { findCartById } from '../services/carts.services.js';
import jwt from 'jsonwebtoken'
import moment from 'moment';

const sendTicket = async (ticket, products, emailUser) => {
    try {
        const email = await transporter.sendMail({
            from: 'CSport <cristian.eam85@gmail.com>',
            to: emailUser,
            subject: 'Gracias por tu compra!',
            html: mailTicket(ticket, products),
        });
        console.log('Correo enviado:', email.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export const insertTicket = async (req, res) => {
    req.logger.info(`Creando ticket de compra - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    try {
        const ticket = {
            codeTicket: Math.floor(Math.random() * 100000000),
            purchase_datetime: moment().format("DD-MMM-YYYY hh:mm"),
            amount: req.body.amount,
            purchaser: req.body.purchaser,
            cart: req.body.cart,
            shippingDetail: req.body.shippingDetail,
            detailPay: req.body.detailPay
        };
        const cart = await findCartById(ticket.cart);

        if (!cart) {
            req.logger.warning(`Carrito con ID ${ticket.cart} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.status(404).json({ Msg: `Carrito no encontrado` });
        }

        sendTicket(ticket, cart.products, ticket.purchaser);
        const newTicket = await createTicket(ticket);

        req.logger.info(`Ticket de compra creado con éxito - Código: ${ticket.codeTicket} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.json(newTicket);
    } catch (error) {
        req.logger.error(`Error en insertTicket: ${error}`);
        return res.status(500).json({ Msg: error });
    }
};

const sendRestorePassword = async (userEmail, token) => {
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

export const tokenRestorePassword = async (req, res) => {
    const { sendEmail } = req.body;
    req.logger.info(`Solicitud de restablecimiento de contraseña recibida - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    if (!sendEmail) {
        req.logger.warning(`Correo electrónico no proporcionado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(400).json({ message: 'El email es requerido' });
    }

    try {
        const token = jwt.sign({ sendEmail }, 'ecommerceSecret', { expiresIn: '1h' });
        req.logger.info(`Token de restablecimiento de contraseña creado - Email: ${sendEmail} - Token: ${token} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        await sendRestorePassword(sendEmail, token);
        req.logger.info(`Correo de restablecimiento enviado con éxito - Email: ${sendEmail} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

        return res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        req.logger.error(`Error en tokenRestorePassword: ${error} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        return res.status(500).json({ message: 'Error al enviar el correo de restablecimiento' });
    }
};