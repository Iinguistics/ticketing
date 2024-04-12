import app from '../app';
import createTicket from './createTicket';
import prefix from '../routes/prefix';
import request from 'supertest';

async function createOrder(userSession: string[]): Promise<string> {
	const ticket = await createTicket();

	const response = await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', userSession)
		.send({ ticket_id: ticket.id });

	return response.body.id;
}

export default createOrder;
