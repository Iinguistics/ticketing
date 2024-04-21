import {
	createObjectId,
	OrderCreatedEvent,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Order } from '../../../models/order';
import OrderCreatedListener from '../OrderCreatedListener';

const price = 20;
const orderId = createObjectId();

const setup = async (invokeOnMessage: boolean | undefined = true) => {
	const listener = new OrderCreatedListener(natsWrapper.client);

	const data: OrderCreatedEvent['data'] = {
		expiresAt: '',
		id: orderId,
		status: OrderStatus.Created,
		ticket: {
			id: createObjectId(),
			price,
		},
		userId: createObjectId(),
		version: 0,
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	if (invokeOnMessage) {
		await listener.onMessage(data, msg);
	}

	return { listener, data, msg };
};

it('saves the replicated order', async () => {
	const { data } = await setup();

	const order = await Order.findById(data.id);

	expect(order).toBeDefined();
	expect(order?.price).toEqual(price);
	expect(order?.status).toEqual(OrderStatus.Created);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});
