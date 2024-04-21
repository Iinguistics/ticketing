import { OrderStatus, createObjectId } from '@jmsgoytia-ticketing/common';
import { Order } from '../../models/order';
import { userId } from '../../test/setup';
import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;

it('returns a 404 when purchasing an order that does not exist', async () => {
	await request(app)
		.post(`${prefix}/payments`)
		.set('Cookie', global.login())
		.send({ order_id: createObjectId(), token: 'abc' })
		.expect(404);
});

it('returns a 401 when order does not belong to the user', async () => {
	const order = Order.build({
		_id: createObjectId(),
		price,
		status: OrderStatus.Created,
		version: 0,
		user_id: createObjectId(),
	});
	await order.save();

	await request(app)
		.post(`${prefix}/payments`)
		.set('Cookie', global.login())
		.send({ order_id: order.id, token: 'abc' })
		.expect(401);
});

it('returns a 400 when trying to purchase a cancelled order', async () => {
	const order = Order.build({
		_id: createObjectId(),
		price,
		status: OrderStatus.Cancelled,
		version: 0,
		user_id: userId,
	});
	await order.save();

	await request(app)
		.post(`${prefix}/payments`)
		.set('Cookie', global.login(true))
		.send({ order_id: order.id, token: 'abc' })
		.expect(400);
});
