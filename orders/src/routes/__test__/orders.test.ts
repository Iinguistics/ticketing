import { Order } from '../../UseCases/Orders/OrdersResponse';
import { OrderStatus } from '@jmsgoytia-ticketing/common';
import app from '../../app';
import createOrder from '../../test/createOrder';
import prefix from '../prefix';
import request from 'supertest';

it('returns a 401 if user is not logged in', async () => {
	await request(app).get(`${prefix}/orders`).expect(401);
});

it('can fetch a list of orders', async () => {
	await createOrder();
	await createOrder();

	const response = await request(app)
		.get(`${prefix}/orders`)
		.set('Cookie', global.login(true))
		.expect(200);

	response.body.orders.forEach((order: Order) => {
		expect(order.status).toEqual(OrderStatus.Created);
	});

	expect(response.body.orders.length).toEqual(2);
});
