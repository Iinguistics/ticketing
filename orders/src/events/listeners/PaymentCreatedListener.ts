import { Message } from 'node-nats-streaming';
import {
	Listener,
	OrderStatus,
	Subjects,
	PaymentCreatedEvent,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import OrderRepository from '../../Repositories/OrderRepository';

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: PaymentCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const { orderId, stripeId } = data;
	}
}

export default PaymentCreatedListener;
