import { Message } from 'node-nats-streaming';
import {
	Id,
	Listener,
	OrderCancelledEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import OrderRepository from '../../Repositories/OrderRepository';

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCancelledEvent['data'],
		msg: Message
	): Promise<void> {
		await OrderRepository.cancel(new Id(data.id), data.version);

		msg.ack();
	}
}

export default OrderCancelledListener;
