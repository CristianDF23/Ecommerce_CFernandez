import ticketModels from '../models/ticket.models.js';

//Crear Ticket
export const createTicket = async (ticket) => {
    try {
        const newTicket = await ticketModels.insertMany(ticket);
        return newTicket
    } catch (error) {
        console.log(error);
    };
};