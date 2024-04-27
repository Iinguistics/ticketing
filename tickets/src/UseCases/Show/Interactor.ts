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
			address: ShowInteractor.#mapToAddress(ticket.address),
			createdAt: ticket.createdAt,
			date: ticket.date,
			description: ticket.description,
			id: ticket.id.value,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
		};
	}

	static #mapToAddress(address: TicketEntity['address']): Ticket['address'] {
		return {
			city: address.city,
			postalCode: address.postalCode,
			state: address.state,
			streetAddress: address.streetAddress,
		};
	}
}

export default new ShowInteractor();
