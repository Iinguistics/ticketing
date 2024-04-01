import { Id, NotFoundError } from '@jmsgoytia-ticketing/common';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import ShowRequest from './ShowRequest';
import ShowResponse from './ShowResponse';
import Ticket from '../../types/Ticket';
import TicketEntity from '../../Entities/Ticket';
import TicketRepository from '../../Repositories/TicketRepository';

class ShowInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: ShowRequest): Promise<ShowResponse> {
		const ticket = await this.#ticketRepository.getById(new Id(req.id));

		if (!ticket) {
			throw new NotFoundError();
		}

		return {
			ticket: this.#mapToResponse(ticket),
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

export default new ShowInteractor();
