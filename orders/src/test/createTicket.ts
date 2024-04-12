import { createObjectId } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';

export const price = 20;
export const title = 'concert';

const createTicket = async () => {
	const ticket = Ticket.build({
		_id: createObjectId(),
		title,
		price,
	});

	await ticket.save();

	return ticket;
}

export default createTicket;