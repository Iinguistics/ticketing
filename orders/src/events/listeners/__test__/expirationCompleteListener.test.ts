import {
	ExpirationCompleteEvent,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Order } from '../../../models/order';
import createOrder from '../../../test/createOrder';
import ExpirationCompleteListener from '../ExpiratonCompleteListener';

const setup = async (invokeOnMessage: boolean | undefined = true) => {
	const session = global.login();

	const orderId = await createOrder(session);

	const listener = new ExpirationCompleteListener(natsWrapper.client);

	const data: ExpirationCompleteEvent['data'] = {
		orderId,
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

it('finds, updates and saves an order', async () => {
	const { data } = await setup();

	const updatedOrder = await Order.findById(data.orderId);

	expect(updatedOrder).toBeDefined();
	expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an OrderCancelled event', async () => {
	const { data, listener, msg } = await setup(false);

	await listener.onMessage(data, msg);

	expect(natsWrapper.client.publish).toHaveBeenCalled();

	const eventData = JSON.parse(
		(natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
	);

	expect(eventData.id).toEqual(data.orderId);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});
