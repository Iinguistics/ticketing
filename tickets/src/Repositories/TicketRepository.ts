import { Id, Pagination, Repository } from '@jmsgoytia-ticketing/common';
import { Ticket } from '../models/ticket';
import { TicketDocument } from '../models/TicketDocument';
import { TicketAttrs } from '../models/ticket';
import TicketEntity from '../Entities/Ticket';
import TicketFactory from '../Factories/TicketFactory';
import UpdateData from './UpdateData';

class TicketRepository extends Repository {
	#ticket;
	#ticketFactory;

	constructor() {
		super();
		this.#ticket = Ticket;
		this.#ticketFactory = TicketFactory;
	}

	async getAll(
		pagination: Pagination | undefined = { limit: 100, offset: 0, page: 1 }
	): Promise<TicketEntity[]> {
		const tickets = await this.#ticket
			.find({
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
		return this.#ticket.countDocuments({
			...TicketRepository._scope('notDeleted'),
		});
	}

	async getById(id: Id): Promise<TicketEntity | null> {
		const ticket = await this.#ticket.findOne({
			_id: { $eq: id.toObjectId() },
			...TicketRepository._scope('notDeleted'),
		});

		if (!ticket) {
			return null;
		}

		return this.#asEntity(ticket);
	}

	async create(attrs: TicketAttrs) {
		const ticket = this.#ticket.build(attrs);

		await ticket.save();

		return this.#asEntity(ticket);
	}

	async update(ticket: TicketEntity): Promise<void> {
		const document = await this.#ticket.findById(ticket.id.toObjectId());

		if (!document) {
			throw new Error(
				`Cannot update, ticket document with ID: ${ticket.id.toObjectId()} not found`
			);
		}

		const data: UpdateData = {
			order_id: undefined,
			modified_at: Date.now(),
			price: ticket.price,
			title: ticket.title,
		};

		if (ticket.orderId) {
			data.order_id = ticket.orderId.toObjectId();
		}

		document.set(data);
		await document.save();

		ticket.incrementVersion();
	}

	#asEntity(document: TicketDocument): TicketEntity {
		return this.#ticketFactory.reconstitute(document);
	}
}

export default new TicketRepository();
