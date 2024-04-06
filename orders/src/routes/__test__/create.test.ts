import { natsWrapper } from '../../NatsWrapper';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import app from '../../app';
import mongoose from 'mongoose';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'concert';

it.todo('fix timeout issues');
// it('returns an error if the ticket does not exist', async () => {
//     await request(app)
//         .post(`${prefix}/orders`)
//         .set('Cookie', global.login())
//         .send({ ticket_id: new mongoose.Types.ObjectId().toHexString() })
// 		.expect(404);
// });

// it('returns an error if the ticket is already reserved', async () => {
// 	const ticket = Ticket.build({
// 		price,
// 		title,
// 	});
// 	await ticket.save();
// 	const order = Order.build({
// 		expires_at: new Date(),
// 		status: OrderStatus.Created,
// 		ticket,
// 		user_id: 'ajsdlkf',
// 	});
// 	await order.save();

// 	await request(app)
// 		.post(`${prefix}/orders`)
// 		.set('Cookie', global.login())
// 		.send({ ticket_id: ticket.id })
// 		.expect(400);
// });

it('reserves a ticket', async () => {
	const ticket = Ticket.build({
		title,
		price,
	});

	await ticket.save();

	await request(app)
		.post(`${prefix}/orders`)
		.set('Cookie', global.login())
		.send({ ticket_id: ticket.id })
		.expect(200);
});
