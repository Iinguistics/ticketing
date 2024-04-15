import {
	createObjectId,
	OrderCreatedEvent,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import OrderCreatedListener from '../OrderCreatedListener';

const price = 20;
const title = 'concert';
const orderId = createObjectId();

const setup = async () => {
	const listener = new OrderCreatedListener(natsWrapper.client);

	const ticket = Ticket.build({
		price,
		title,
		user_id: createObjectId(),
	});

	await ticket.save();

	const data: OrderCreatedEvent['data'] = {
		expiresAt: '',
		id: orderId,
		status: OrderStatus.Created,
		ticket: {
			id: ticket.id,
			price: ticket.price,
		},
		userId: createObjectId(),
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	await listener.onMessage(data, msg);

	return { listener, data, msg, ticket };
};

it('sets the order id on the ticket', async () => {
	const { data } = await setup();

	const ticket = await Ticket.findById(data.ticket.id);

	expect(ticket).toBeDefined();
	expect(ticket?.price).toEqual(price);
	expect(ticket?.order_id).toEqual(orderId);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});
