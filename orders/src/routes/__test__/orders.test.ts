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
	const userOne = global.login();
	const userTwo = global.login();

	await createOrder(userOne);
	await createOrder(userOne);
	await createOrder(userTwo);

	const responseOne = await request(app)
		.get(`${prefix}/orders`)
		.set('Cookie', userOne)
		.expect(200);

	responseOne.body.orders.forEach((order: Order) => {
		expect(order.status).toEqual(OrderStatus.Created);
	});

	expect(responseOne.body.orders.length).toEqual(2);

	const responseTwo = await request(app)
		.get(`${prefix}/orders`)
		.set('Cookie', userTwo)
		.expect(200);

	responseTwo.body.orders.forEach((order: Order) => {
		expect(order.status).toEqual(OrderStatus.Created);
	});

	expect(responseTwo.body.orders.length).toEqual(1);
});
