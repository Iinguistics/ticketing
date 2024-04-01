import { Id } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';
import { TicketDocument } from '../models/TicketDocument';
import { TicketAttrs } from '../models/ticket';
import Pagination from './Pagination';
import Repository from './Repository';
import TicketEntity from '../Entities/Ticket';
import TicketFactory from '../Factories/TicketFactory';

class TicketRepository extends Repository {
	#ticketFactory;

	constructor() {
		super();
		this.#ticketFactory = TicketFactory;
	}

	async getAll(
		pagination: Pagination | undefined = { limit: 100, offset: 0, page: 1 }
	): Promise<TicketEntity[]> {
		const tickets = await Ticket.find({
			...TicketRepository._scope('notDeleted'),
		})
			.limit(pagination.limit)
			.skip(TicketRepository._calcSkip(pagination));

		if (!tickets.length) {
			return [];
		}

		return tickets.map((ticket) => this.#asEntity(ticket));
	}

	async countAll(): Promise<number> {
		return Ticket.countDocuments({
			...TicketRepository._scope('notDeleted'),
		});
	}

	async getById(id: Id): Promise<TicketEntity | null> {
		const ticket = await Ticket.findOne({
			_id: { $eq: id.toObjectId() },
			...TicketRepository._scope('notDeleted'),
		});

		if(!ticket){
			return null;
		}

		return this.#asEntity(ticket)
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
