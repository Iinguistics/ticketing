import { Ticket } from './TicketsResponse';
import TicketEntity from '../../Entities/Ticket';
import TicketsRequest from './TicketsRequest';
import TicketsResponse from './TicketsResponse';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import TicketRepository from '../../Repositories/TicketRepository';

class TicketsInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: TicketsRequest): Promise<TicketsResponse> {
		const tickets = await this.#ticketRepository.getAll();
		const total = await this.#ticketRepository.countAll();

		return {
			tickets: tickets.map((ticket) => this.#mapToResponse(ticket)),
			total,
		};
	}

	#mapToResponse(ticket: TicketEntity): Ticket {
		return {
			createdAt: ticket.createdAt,
			id: ticket.id.value,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
		};
	}
}

export default new TicketsInteractor();
