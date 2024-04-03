import { natsWrapper } from '../../NatsWrapper';
import { Ticket } from '../../models/ticket';
import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

it('can only be accessed if the user is logged in', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.send({ price, title })
		.expect(401);
});

it('returns a 400 if an invalid price is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: -2, title })
		.expect(400);
});

it('returns a 400 if an invalid title is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title: '' })
		.expect(400);
});

it('creates a ticket with valid inputs', async () => {
	let tickets = await Ticket.find({});
	expect(tickets.length).toEqual(0);

	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title })
		.expect(200);

	tickets = await Ticket.find({});
	expect(tickets.length).toEqual(1);
	expect(tickets[0].price).toEqual(price);
	expect(tickets[0].title).toEqual(title);
});

it('publishes an event', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title })
		.expect(200);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
