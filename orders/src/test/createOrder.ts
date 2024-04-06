import { createObjectId } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';
import app from '../app';
import prefix from '../routes/prefix';
import request from 'supertest';

const price = 20;
const title = 'concert';

async function createOrder() {
	const ticket = Ticket.build({
		title,
		price,
	});

	await ticket.save();

	await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', global.login(true))
		.send({ ticket_id: ticket.id });
}

export default createOrder;
