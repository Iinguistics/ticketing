import { createObjectId } from '@jmsgoytia-ticketing/common';
import { price, title } from '../../test/createTicket';
import app from '../../app';
import createOrder from '../../test/createOrder';
import prefix from '../prefix';
import request from 'supertest';

it('returns a 400 if the order id is not a valid ObjectId', async () => {
	await request(app)
		.get(`${prefix}/orders/${createObjectId()}abc`)
		.set('Cookie', global.login())
		.send()
		.expect(400);
});

it('returns a 401 if user is not logged in', async () => {
	await request(app).get(`${prefix}/orders/${createObjectId}`).expect(401);
});

it('returns a 404 if order is not found', async () => {
	await request(app)
		.get(`${prefix}/orders/${createObjectId()}`)
		.set('Cookie', global.login())
		.send()
		.expect(404);
});

it('returns a 401 if the order does not belong to the logged in user', async () => {
	const session = global.login();

	const orderId = await createOrder(session);

	await request(app)
		.get(`${prefix}/orders/${orderId}`)
		.set('Cookie', global.login())
		.send()
		.expect(401);
});

it('returns the order by id', async () => {
	const session = global.login();

	const orderId = await createOrder(session);

	const response = await request(app)
		.get(`${prefix}/orders/${orderId}`)
		.set('Cookie', session)
		.send()
		.expect(200);

	expect(response.body.order.id).toEqual(orderId);
	expect(response.body.order.ticket_price).toEqual(price);
	expect(response.body.order.ticket_title).toEqual(title);
});