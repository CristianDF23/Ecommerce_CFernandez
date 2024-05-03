import { transporter } from "../config/nodemailer.js";
import { mail } from "../utils/mail.js";
import { createTicket } from "../services/mail.services.js";
import { findCartById } from '../services/carts.services.js';
import moment from 'moment';

export const sendTicket = async (ticket, products, recipientEmail) => {
    try {
        const email = await transporter.sendMail({
            from: 'CSport <cristian.eam@gmail.com>',
            to: recipientEmail, 
            subject: 'Gracias por tu compra!',
            html: mail(ticket, products),
        });
        console.log('Correo enviado:', email.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export const insertTicket = async (req, res) => {
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
        sendTicket(ticket, cart.products, ticket.purchaser);
        const newTicket = await createTicket(ticket);
        res.json(newTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};