import {
	createObjectId,
	OrderCancelledEvent,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Order } from '../../../models/order';
import OrderCancelledListener from '../OrderCancelledListener';

const price = 20;
const orderId = createObjectId();

const setup = async (invokeOnMessage: boolean | undefined = true) => {
	const listener = new OrderCancelledListener(natsWrapper.client);

	const order = Order.build({
		_id: orderId,
		price,
		status: OrderStatus.Created,
		user_id: createObjectId(),
		version: 0,
	});

	await order.save();

	const data: OrderCancelledEvent['data'] = {
		id: orderId,
		ticket: {
			id: createObjectId(),
		},
		userId: createObjectId(),
		version: 1,
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	if (invokeOnMessage) {
		await listener.onMessage(data, msg);
	}

	return { listener, data, msg, order };
};

it('updates the order to cancelled status', async () => {
	const { order } = await setup();

	const updatedOrder = await Order.findById(order.id);

	expect(updatedOrder).toBeDefined();
	expect(updatedOrder?.price).toEqual(price);
	expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});
