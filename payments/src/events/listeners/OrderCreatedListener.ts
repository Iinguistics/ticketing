import { Message } from 'node-nats-streaming';
import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import OrderRepository from '../../Repositories/OrderRepository';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const attrs = {
			_id: data.id,
			price: data.ticket.price,
			status: data.status,
			user_id: data.userId,
			version: data.version,
		};

		await OrderRepository.create(attrs);

		msg.ack();
	}
}

export default OrderCreatedListener;
