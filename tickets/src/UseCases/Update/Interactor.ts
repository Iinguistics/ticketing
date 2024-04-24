import { natsWrapper } from '../../NatsWrapper';
import {
	Address,
	BadRequestError,
	Id,
	NotAuthorizedError,
	NotFoundError,
} from '@jmsgoytia-ticketing/common';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import Ticket from '../../Entities/Ticket';
import TicketUpdatedPublisher from '../../events/publishers/TicketUpdatedPublisher';
import TicketRepository from '../../Repositories/TicketRepository';
import UpdateRequest from './UpdateRequest';
import UpdateResponse from './UpdateResponse';

class UpdateInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: UpdateRequest): Promise<UpdateResponse> {
		const userId = new Id(req.userId);

		const ticket = await this.#getTicketById(new Id(req.id));

		UpdateInteractor.#checkTicket(ticket, userId);

		UpdateInteractor.#updateEntity(req, ticket);

		await this.#ticketRepository.update(ticket);

		new TicketUpdatedPublisher(natsWrapper.client).publish({
			id: ticket.id.value,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
			version: ticket.version,
		});

		return {
			id: ticket.id.value,
		};
	}

	async #getTicketById(id: Id): Promise<Ticket> {
		const ticket = await this.#ticketRepository.getById(id);

		if (!ticket) {
			throw new NotFoundError();
		}

		return ticket;
	}

	static #checkTicket(ticket: Ticket, userId: Id): void {
		if (!ticket.userId.equals(userId)) {
			throw new NotAuthorizedError();
		}

		if (ticket.orderId) {
			throw new BadRequestError(
				`Cannot edit, ticket ID: ${ticket.id.value} is reserved`
			);
		}
	}

	static #updateEntity(req: UpdateRequest, ticket: Ticket): void {
		ticket.address = new Address({
			city: req.address.city,
			postalCode: req.address.postalCode,
			state: req.address.state,
			streetAddress: req.address.streetAddress,
		});
		ticket.date = new Date(req.date);
		ticket.description = req.description || null;
		ticket.price = req.price;
		ticket.title = req.title;
	}
}

export default new UpdateInteractor();
