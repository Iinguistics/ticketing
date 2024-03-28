import { Ticket } from '../models/ticket';
import { TicketDocument } from '../models/TicketDocument';
import { TicketAttrs } from '../models/ticket';
import TicketEntity from '../Entities/Ticket';
import TicketFactory from '../Factories/TicketFactory';

class TicketRepository {
	#ticketFactory;

	constructor() {
		this.#ticketFactory = TicketFactory;
	}

	async create(attrs: TicketAttrs) {
		const ticket = Ticket.build(attrs);

		await ticket.save();

		return this.#asEntity(ticket);
	}

	#asEntity(document: TicketDocument): TicketEntity {
		return this.#ticketFactory.reconstitute(document);
	}
}

export default new TicketRepository();
