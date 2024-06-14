import { createTicket, sendRestorePassword, sendTicket } from "../../../services/MongoDb/mail.services.js";
import { findCartById } from '../../../services/MongoDb/carts.services.js';
import jwt from 'jsonwebtoken'
import moment from 'moment';

export default class MailManagerMongoDB {

    async createTicket(req, res) {
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
            const isCartFound = await findCartById(ticket.cart);

            if (!isCartFound) {
                req.logger.warning(`Carrito con ID ${ticket.cart} no encontrado - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
                return res.status(404).json({ Msg: `Carrito no encontrado` });
            }

            await sendTicket(ticket, isCartFound.products, ticket.purchaser);
            const newTicket = await createTicket(ticket);

            req.logger.info(`Ticket de compra creado con éxito - Código: ${ticket.codeTicket} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
            return res.json(newTicket);
        } catch (error) {
            req.logger.error(`Error al crear ticket: ${error}`);
            return res.status(500).json({ Msg: error });
        }
    };


    async tokenRestorePassword(req, res) {
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
}

