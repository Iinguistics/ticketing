import { createObjectId } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';
import app from '../app';
import prefix from '../routes/prefix';
import request from 'supertest';

export const price = 20;
export const title = 'concert';

async function createOrder(userSession: string[]): Promise<string> {
	const ticket = Ticket.build({
		_id: createObjectId(),
		title,
		price,
	});

	await ticket.save();

	const response = await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', userSession)
		.send({ ticket_id: ticket.id });

	return response.body.id;
}

export default createOrder;
