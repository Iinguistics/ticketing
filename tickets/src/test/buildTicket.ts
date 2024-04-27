import { Ticket } from '../models/ticket';
import createObjectId from './createObjectId';

async function buildTicket() {
	const ticket = Ticket.build({
		address: {
			city: 'San Diego',
			postal_code: '92071',
			state: 'ca',
			street_address: '1234',
		},
		date: '2024-04-25T12:00:00',
		description: null,
		price: 20,
		title: 'concert',
		user_id: createObjectId(),
	});

	await ticket.save();

	return ticket;
}

export default buildTicket;
