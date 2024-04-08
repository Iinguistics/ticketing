import { Id, Repository } from '@jmsgoytia-ticketing/common';
import { Ticket, TicketAttrs } from '../models/ticket';
import { TicketDocument } from '../models/TicketDocument';
import TicketEntity from '../Entities/Ticket';
import TicketFactory from '../Factories/TicketFactory';

class TicketRepository extends Repository {
	#ticket;
	#ticketFactory;

	constructor() {
		super();
		this.#ticket = Ticket;
		this.#ticketFactory = TicketFactory;
	}

	async getById(id: Id): Promise<TicketEntity | null> {
		const ticket = await this.#ticket.findById(id.value);

		if (!ticket) {
			return null;
		}

		return this.#asEntity(ticket);
	}

	async getDocumentById(id: Id): Promise<TicketDocument | null> {
		const ticket = await this.#ticket.findById(id.value);

		if (!ticket) {
			return null;
		}

		return ticket;
	}

	async create(attrs: TicketAttrs): Promise<TicketDocument> {
		const ticket = this.#ticket.build(attrs);

		await ticket.save();

		return ticket;
	}

	async update(ticket: TicketEntity): Promise<void> {
		const data = {
			$set: {
				modified_at: Date.now(),
				price: ticket.price,
				title: ticket.title,
			},
		};

		await this.#ticket.updateOne(
			{ _id: { $eq: ticket.id.toObjectId() } },
			data
		);
	}

	#asEntity(document: TicketDocument): TicketEntity {
		return this.#ticketFactory.reconstitute(document);
	}
}

export default new TicketRepository();
