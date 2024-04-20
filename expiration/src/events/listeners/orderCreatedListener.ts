import { Message } from 'node-nats-streaming';
import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import expirationQueue from '../../queues/expirationQueue';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

		await expirationQueue.add(
			{
				orderId: data.id,
			},
			{
				delay,
			}
		);

		msg.ack();
	}
}

export default OrderCreatedListener;
