import { Message } from 'node-nats-streaming';
import {
	Listener,
	Subjects,
	TicketCreatedEvent,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import TicketRepository from '../../Repositories/TicketRepository';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: TicketCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const { id, price, title } = data;

		await TicketRepository.create({
			_id: id,
			price,
			title,
		});

		msg.ack();
	}
}

export default TicketCreatedListener;
