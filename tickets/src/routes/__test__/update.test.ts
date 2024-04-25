import { natsWrapper } from '../../NatsWrapper';
import { Ticket } from '../../models/ticket';
import { ticketData } from '../../test/createTicket';
import app from '../../app';
import createObjectId from '../../test/createObjectId';
import createTicket from '../../test/createTicket';
import prefix from '../prefix';
import request from 'supertest';

it('returns a 401 if the user is not authenticated', async () => {
	return request(app)
		.put(`${prefix}/tickets/${createObjectId()}`)
		.send(ticketData)
		.expect(401);
});

it('returns a 404 if ticket is not found', async () => {
	return request(app)
		.put(`${prefix}/tickets/${createObjectId()}`)
		.set('Cookie', global.login())
		.send(ticketData)
		.expect(404);
});

it('returns a 401 if the user does not own the ticket', async () => {
	const response = await createTicket();

	return request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', global.login())
		.send(ticketData)
		.expect(401);
});

it('returns a 400 if invalid title or price', async () => {
	const cookie = global.login();
	const response = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', cookie)
		.send(ticketData);

	await request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ price: ticketData.price, title: '' })
		.expect(400);

	return request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ price: '', title: ticketData.title })
		.expect(400);
});

it('updates the ticket when provided valid inputs', async () => {
	const cookie = global.login();
	const response = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', cookie)
		.send(ticketData);

	const ticketId = response.body.id;

	await request(app)
		.put(`${prefix}/tickets/${ticketId}`)
		.set('Cookie', cookie)
		.send({ ...ticketData, price: 30, title: 'new title' })
		.expect(200);

	const ticketResponse = await request(app)
		.get(`${prefix}/tickets/${ticketId}`)
		.send();

	expect(ticketResponse.body.ticket.price).toEqual(30);
	expect(ticketResponse.body.ticket.title).toEqual('new title');
	expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects the update if the ticket is reserved', async () => {
	const cookie = global.login();
	const response = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', cookie)
		.send(ticketData);

	const ticketId = response.body.id;

	const ticket = await Ticket.findById(ticketId);
	ticket!.set({ order_id: createObjectId() });
	await ticket?.save();

	await request(app)
		.put(`${prefix}/tickets/${ticketId}`)
		.set('Cookie', cookie)
		.send({ ...ticketData, title: 'new title' })
		.expect(400);

	const ticketResponse = await request(app)
		.get(`${prefix}/tickets/${ticketId}`)
		.send();

	expect(ticketResponse.body.ticket.price).toEqual(ticketData.price);
	expect(ticketResponse.body.ticket.title).not.toEqual('new title');
});
