import { Message } from 'node-nats-streaming';
import {
	Listener,
	PaymentCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { sqs } from '../../local/aws';
import {
	SEND_ORDER_NOTIFICATION_QUEUE_URL,
	QUEUE_GROUP_NAME,
} from '../../local/config';

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: PaymentCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const params = {
			MessageBody: JSON.stringify({
				email: data.email,
				paymentId: data.id,
				orderId: data.orderId,
			}),
			QueueUrl: SEND_ORDER_NOTIFICATION_QUEUE_URL,
		};

		const response = await sqs.sendMessage(params).promise();

		if (!response.MessageId) {
			throw new Error(
				`Could not send payment ID: ${data.id} to queue for order notification`
			);
		}

		msg.ack();
	}
}

export default PaymentCreatedListener;
