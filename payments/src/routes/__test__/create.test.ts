import { OrderStatus, createObjectId } from '@jmsgoytia-ticketing/common';
import { Order } from '../../models/order';
import { Payment } from '../../models/payment';
import { userId } from '../../test/setup';
import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';
import StripeGateway from '../../Gateways/Stripe/StripeGateway';

/** Deprecated */
const chargeToken = 'tok_visa';
const price = 20;
const randomPrice = Math.floor(Math.random() * 100000);

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

it('returns a 201 with valid inputs', async () => {
	const order = Order.build({
		_id: createObjectId(),
		price: randomPrice,
		status: OrderStatus.Created,
		version: 0,
		user_id: userId,
	});
	await order.save();

	const response = await request(app)
		.post(`${prefix}/payments`)
		.set('Cookie', global.login(true))
		.send({
			token: 'pm_card_visa',
			order_id: order.id,
		})
		.expect(201);

	const payment = await Payment.findById(response.body.id);

	expect(payment).not.toBeNull();
	expect(payment?.order_id).toEqual(order.id);
	expect(payment?.stripe_id).toEqual(response.body.stripe_id);
});

it('finds charge in charge list', async () => {
	const stripeCharges = await StripeGateway.list();

	const stripeCharge = stripeCharges.data.find(
		(charge) => charge.amount === randomPrice * 100
	);

	expect(stripeCharge).toBeDefined();
	expect(stripeCharge!.currency).toEqual('usd');
});
