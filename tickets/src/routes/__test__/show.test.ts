import app from '../../app';
import createObjectId from '../../test/createObjectId';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

it('returns a 400 if the ticket id is not a valid ObjectId', async () => {
	await request(app)
		.get(`${prefix}/tickets/${createObjectId()}abc`)
		.set('Cookie', global.login())
		.send()
		.expect(400);
});

it('returns a 404 if ticket is not found', async () => {
	await request(app)
		.get(`${prefix}/tickets/${createObjectId()}`)
		.set('Cookie', global.login())
		.send()
		.expect(404);
});

it('returns the ticket by id', async () => {
	const createdTicket = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title })
		.expect(200);

	const ticketId = createdTicket.body.id;

	const ticket = await request(app)
		.get(`${prefix}/tickets/${ticketId}`)
		.set('Cookie', global.login())
		.send()
		.expect(200);

	expect(ticket.body.ticket.id).toEqual(ticketId);
	expect(ticket.body.ticket.price).toEqual(price);
	expect(ticket.body.ticket.title).toEqual(title);
});
