import { Message } from 'node-nats-streaming';
import {
	Id,
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import Ticket from '../../Entities/Ticket';
import TicketRepository from '../../Repositories/TicketRepository';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCreatedEvent['data'],
		msg: Message
	): Promise<void> {
		const ticket = await this.#getTicketById(new Id(data.ticket.id));

		const { id } = data;

		ticket.orderId = new Id(id);

		await TicketRepository.update(ticket);

		msg.ack();
	}

	async #getTicketById(id: Id): Promise<Ticket> {
		const ticket = await TicketRepository.getById(id);

		if (!ticket) {
			throw new Error(`Ticket with ID: ${id.value} not found`);
		}

		return ticket;
	}
}

export default OrderCreatedListener;
