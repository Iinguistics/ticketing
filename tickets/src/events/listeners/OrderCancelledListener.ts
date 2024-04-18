import { Message } from 'node-nats-streaming';
import {
	Id,
	Listener,
	OrderCancelledEvent,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { QUEUE_GROUP_NAME } from '../../local/config';
import Ticket from '../../Entities/Ticket';
import TicketRepository from '../../Repositories/TicketRepository';
import TicketUpdatedPublisher from '../publishers/TicketUpdatedPublisher';

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: OrderCancelledEvent['data'],
		msg: Message
	): Promise<void> {
		const ticket = await this.#getTicketById(new Id(data.ticket.id));

		ticket.orderId = undefined;

		await TicketRepository.update(ticket);

		await new TicketUpdatedPublisher(this._client).publish({
			id: ticket.id.value,
			orderId: ticket.orderId,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
			version: ticket.version,
		});

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

export default OrderCancelledListener;
