import {
	createObjectId,
	OrderCancelledEvent,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import OrderCancelledListener from '../OrderCancelledListener';

const price = 20;
const title = 'concert';
const orderId = createObjectId();

const setup = async () => {
	const listener = new OrderCancelledListener(natsWrapper.client);

	const ticket = Ticket.build({
		price,
		title,
		user_id: createObjectId(),
	});

	ticket.set({ order_id: createObjectId() });

	await ticket.save();

	const data: OrderCancelledEvent['data'] = {
		id: orderId,
		ticket: {
			id: ticket.id,
		},
		userId: createObjectId(),
		version: 0,
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	await listener.onMessage(data, msg);

	return { listener, data, msg, ticket };
};

it('updates the ticket', async () => {
	const { data } = await setup();

	const ticket = await Ticket.findById(data.ticket.id);

	expect(ticket).toBeDefined();
	expect(ticket?.order_id).not.toBeDefined();
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
	await setup();

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
