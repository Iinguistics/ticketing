import { Message } from 'node-nats-streaming';
import {
	Listener,
	PaymentCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: PaymentCreatedEvent['data'],
		msg: Message
	): Promise<void> {}
}

export default PaymentCreatedListener;
