import { Id, Repository } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';
import { TicketDocument } from '../models/TicketDocument';

class TicketRepository extends Repository {
	constructor() {
		super();
	}

	async getById(id: Id): Promise<TicketDocument | null> {
		const ticket = await Ticket.findById(id.value);

		if (!ticket) {
			return null;
		}

		return ticket;
	}
}

export default new TicketRepository();
