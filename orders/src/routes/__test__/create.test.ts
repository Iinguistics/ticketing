import { natsWrapper } from '../../NatsWrapper';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/order';
import app from '../../app';
import createOrder from '../../test/createOrder';
import createTicket from '../../test/createTicket';
import mongoose from 'mongoose';
import prefix from '../prefix';
import request from 'supertest';

it('returns an 404 error if the ticket does not exist', async () => {
    await request(app)
        .post(`${prefix}/orders`)
        .set('Cookie', global.login())
        .send({ ticket_id: new mongoose.Types.ObjectId().toHexString() })
		.expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
	const ticket = await createTicket();

	const order = Order.build({
		expires_at: new Date(),
		status: OrderStatus.Created,
		ticket: new mongoose.Types.ObjectId(ticket.id),
		user_id: 'ajsdlkf',
	});
	await order.save();

	await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', global.login())
		.send({ ticket_id: ticket.id })
		.expect(400);
});

it('reserves a ticket', async () => {
	const ticket = await createTicket();

	await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', global.login())
		.send({ ticket_id: ticket.id })
		.expect(200);
});

it('publishes an event', async () => {
	const session = global.login();

	await createOrder(session);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
