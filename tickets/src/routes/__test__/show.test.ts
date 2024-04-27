import app from '../../app';
import { ticketData } from '../../test/createTicket';
import createObjectId from '../../test/createObjectId';
import createTicket from '../../test/createTicket';
import prefix from '../prefix';
import request from 'supertest';

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
	const createdTicket = await createTicket();

	const ticketId = createdTicket.body.id;

	const ticket = await request(app)
		.get(`${prefix}/tickets/${ticketId}`)
		.set('Cookie', global.login())
		.send()
		.expect(200);

	expect(ticket.body.ticket.id).toEqual(ticketId);
	expect(ticket.body.ticket.price).toEqual(ticketData.price);
	expect(ticket.body.ticket.title).toEqual(ticketData.title);
});
