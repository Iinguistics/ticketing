import { createObjectId, OrderStatus } from '@jmsgoytia-ticketing/common';
import { natsWrapper } from '../../NatsWrapper';
import app from '../../app';
import createOrder from '../../test/createOrder';
import prefix from '../prefix';
import request from 'supertest';

it('returns a 400 if the order id is not a valid ObjectId', async () => {
	await request(app)
		.patch(`${prefix}/orders/${createObjectId()}abc`)
		.set('Cookie', global.login())
		.send()
		.expect(400);
});

it('returns a 401 if user is not logged in', async () => {
	await request(app).get(`${prefix}/orders/${createObjectId}`).expect(401);
});

it('returns a 404 if order is not found', async () => {
	await request(app)
		.patch(`${prefix}/orders/${createObjectId()}`)
		.set('Cookie', global.login())
		.send()
		.expect(404);
});

it('returns a 401 if the order does not belong to the logged in user', async () => {
	const session = global.login();

	const orderId = await createOrder(session);

	await request(app)
		.patch(`${prefix}/orders/${orderId}`)
		.set('Cookie', global.login())
		.send()
		.expect(401);
});

it(`updates the status of the order to ${OrderStatus.Cancelled}`, async () => {
	const session = global.login();

	const orderId = await createOrder(session);

	await request(app)
		.patch(`${prefix}/orders/${orderId}`)
		.set('Cookie', session)
		.send()
		.expect(200);

	const response = await request(app)
		.get(`${prefix}/orders/${orderId}`)
		.set('Cookie', session)
		.send()
		.expect(200);

	expect(response.body.order.id).toEqual(orderId);
	expect(response.body.order.status).toEqual(OrderStatus.Cancelled);
});

it('publishes an event', async () => {
	const session = global.login();

	const orderId = await createOrder(session);

	await request(app)
		.patch(`${prefix}/orders/${orderId}`)
		.set('Cookie', session)
		.send()
		.expect(200);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});