import { Message } from 'node-nats-streaming';
import {
	Id,
	Listener,
	Subjects,
	TicketUpdatedEvent,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import TicketRepository from '../../Repositories/TicketRepository';

class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: TicketUpdatedEvent['data'],
		msg: Message
	): Promise<void> {
		const { id, price, title } = data;

		const ticket = await TicketRepository.getById(new Id(id));

		if(!ticket){
			throw new Error('Ticket not found')
		}

		ticket.price = price;
		ticket.title = title;

		await TicketRepository.update(ticket);

		msg.ack();
	}
}

export default TicketUpdatedListener;
