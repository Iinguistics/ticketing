import { natsWrapper } from '../../NatsWrapper';
import { Ticket } from '../../models/ticket';
import { ticketData } from '../../test/createTicket';
import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';

it('can only be accessed if the user is logged in', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.send(ticketData)
		.expect(401);
});

it('returns a 400 if an invalid price is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: -2, title: ticketData.title })
		.expect(400);
});

it('returns a 400 if an invalid title is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: ticketData.price, title: '' })
		.expect(400);
});

it('creates a ticket with valid inputs', async () => {
	let tickets = await Ticket.find({});
	expect(tickets.length).toEqual(0);

	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send(ticketData)
		.expect(200);

	tickets = await Ticket.find({});
	expect(tickets.length).toEqual(1);
	expect(tickets[0].price).toEqual(ticketData.price);
	expect(tickets[0].title).toEqual(ticketData.title);
	expect(tickets[0].address.city).toEqual(ticketData.city);
	expect(tickets[0].date).toEqual(new Date(ticketData.date));
	expect(tickets[0].description).toBe(null);
});

it('publishes an event', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send(ticketData)
		.expect(200);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
