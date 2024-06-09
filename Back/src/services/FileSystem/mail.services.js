import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import  __dirname  from '../../path.js';

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
        console.error('Error al insertar el ticket:', error);
        return null;
    }
};