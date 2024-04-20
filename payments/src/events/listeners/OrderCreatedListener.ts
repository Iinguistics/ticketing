import { Message } from 'node-nats-streaming';
import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { Order } from '../../models/order';
import { QUEUE_GROUP_NAME } from '../../local/config';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const order = Order.build({
			_id: data.id,
			price: data.ticket.price,
			status: data.status,
			user_id: data.userId,
			version: data.version,
		});

		await order.save();

		msg.ack();
	}
}

export default OrderCreatedListener;
