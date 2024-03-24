import app from '../../app';
import createObjectId from '../../test/createObjectId';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

it('can only be accessed if the user is logged in', async () => {
	await request(app)
		.get(`${prefix}/tickets/${createObjectId()}`)
		.expect(401);
});

it('returns a 404 if ticket is not found', async () => {
	await request(app)
		.get(`${prefix}/tickets/${createObjectId()}`)
		.set('Cookie', global.login())
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
		.expect(200);

	expect(ticket.body.id).toEqual(ticketId);
	expect(ticket.body.price).toEqual(price);
	expect(ticket.body.title).toEqual(title);
});
