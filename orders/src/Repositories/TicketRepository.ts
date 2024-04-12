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

	async getByEventVersion(
		id: Id,
		version: number
	): Promise<TicketEntity | null> {
		const ticket = await Ticket.findOne({
			_id: { $eq: id.toObjectId() },
			version: { $eq: version - 1 },
		});

		if (!ticket) {
			return null;
		}

		return this.#asEntity(ticket);
	}

	async create(attrs: TicketAttrs): Promise<TicketDocument> {
		const ticket = this.#ticket.build(attrs);

		await ticket.save();

		return ticket;
	}

	async update(ticket: TicketEntity): Promise<void> {
		const document = await this.#ticket.findById(ticket.id.toObjectId());

		if (!document) {
			throw new Error(
				`Cannot update, ticket document with ID: ${ticket.id.toObjectId()} not found`
			);
		}

		const data = {
				modified_at: Date.now(),
				price: ticket.price,
				title: ticket.title,
		};

		document.set(data)

		await document.save();

		ticket.incrementVersion();
	}

	#asEntity(document: TicketDocument): TicketEntity {
		return this.#ticketFactory.reconstitute(document);
	}
}

export default new TicketRepository();
